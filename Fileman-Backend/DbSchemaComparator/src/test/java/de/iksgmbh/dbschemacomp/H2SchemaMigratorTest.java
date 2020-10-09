package de.iksgmbh.dbschemacomp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import de.iksgmbh.dbschemacomp.helper.FileUtil;
import de.iksgmbh.dbschemacomp.util.TestUtil;

public class H2SchemaMigratorTest {
	
	private static EmbeddedDatabase embeddedDatabase;
	
	@BeforeAll
	public static void init() {
		new File("injectedUpdateScript.sql").delete();
		new File("failingUpdateScript.sql").delete();

		embeddedDatabase = new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2)
				                                        .addScript("H2DbSchema1.txt").build();
	}

	@AfterAll
	public static void cleanup() {
		new File("injectedUpdateScript.sql").delete();
		new File("failingUpdateScript.sql").delete();
		embeddedDatabase.shutdown();
	}
	
	@Test
	/**	 Tests the migration from H2DbSchema1 to H2DbSchema2  */
	public void migratesComplexDbSchema() throws SQLException, IOException 
	{
		// arrange
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		String oldSchema = TestUtil.getDatabaseSchema(template);
		String newSchema = FileUtil.readTextFile("src/test/resources/H2DbSchema2.txt");

		// act
		String actualMigrationScript = H2SchemaMigrator.updateDB(embeddedDatabase.getConnection(), 
				                                                  oldSchema, newSchema);  // migrate back to original schema
		
		// assert
		String expected = FileUtil.readTextFile("src/test/resources/ExpectedUpdateScript.txt");
		assertEquals(expected, actualMigrationScript, "Generated Migration script");
	}
	
	@Test
	public void createsEmptyMigrateScript() throws SQLException, IOException 
	{
		// arrange
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		String oldSchema = TestUtil.getDatabaseSchema(template);
		String newSchema = TestUtil.getDatabaseSchema(template);

		// act
		String actualMigrationScript = H2SchemaMigrator.updateDB(embeddedDatabase.getConnection(), 
				                                                  newSchema, oldSchema);  // migrate back to original schema
		
		// assert
		assertEquals("", actualMigrationScript, "Generated Migration script");
	}

	
	@Test
	public void migratesDbSchema_dropTable() throws SQLException, IOException 
	{
		testDbSchemaUpdate("create table NEW_TABLE_FROM_TEST (ID INT);", 
				           "drop table NEW_TABLE_FROM_TEST;");
	}

	@Test
	public void migratesDbSchema_createTable() throws SQLException, IOException 
	{
		testDbSchemaUpdate("drop table USER_PREFERENCES;", 
				           "CREATE TABLE USER_PREFERENCES (USER_ID INT NOT NULL, CONTENT_TYPE VARCHAR, FAVOURITE_FILTER_ACTIVE BOOLEAN, LAYOUT_TYPE VARCHAR, PRIMARY KEY (USER_ID));");
	}
	
	@Test
	public void migratesDbSchema_dropColumn() throws SQLException, IOException 
	{
		testDbSchemaUpdate("alter table USER add AGE Number not null default 18;", 
				           "ALTER TABLE USER DROP COLUMN age;");
	}
	
	@Test
	public void migratesDbSchema_createColumn() throws SQLException, IOException 
	{
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		template.execute("alter table USER alter column ROLE varchar not null default 'Standard'");
		
		// a column is being dropped here, and the DBMigrator must a script that adds the dropped column again
		// with all attributes!
		testDbSchemaUpdate("ALTER TABLE USER DROP COLUMN ROLE;", 
				           "ALTER TABLE USER ADD role varchar not null default 'standard';");
	}
	
	@Test
	public void migratesDbSchema_modifyColumn() throws SQLException, IOException 
	{
		testDbSchemaUpdate("alter table USER alter column role int null default 1", 
				           "ALTER TABLE USER ALTER COLUMN role varchar;");
	}

	@Test
	public void migratesDbSchema_createPrimaryKey() throws SQLException, IOException 
	{
		testDbSchemaUpdate("alter table USER drop primary key", 
				           "ALTER TABLE USER ADD PRIMARY KEY (id);");
	}
	
	@Test
	public void migratesDbSchema_removePrimaryKey() throws SQLException, IOException 
	{
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		template.execute("alter table USER drop primary key");
		
		testDbSchemaUpdate("ALTER TABLE USER ADD PRIMARY KEY (ID);", 
				           "ALTER TABLE USER DROP PRIMARY KEY;");
	}
	
	@Test
	public void migratesDbSchema_createsUniqueConstraint() throws SQLException, IOException 
	{
		testDbSchemaUpdate("ALTER TABLE user DROP CONSTRAINT UK_A65G3FMTVDWJ8RO965B14FNKO", 
				           "ALTER TABLE USER ADD CONSTRAINT UK_A65G3FMTVDWJ8RO965B14FNKO UNIQUE (NAME);");
	}
	
	@Test
	public void migratesDbSchema_removeUniqueConstraint() throws SQLException, IOException 
	{
		testDbSchemaUpdate("alter table FILE_META_DATA add constraint cstr123 unique (CREATION_DATE)", 
				           "ALTER TABLE FILE_META_DATA DROP CONSTRAINT CSTR123;");
	}
	
	private void testDbSchemaUpdate(String sqlToChangeSchema, 
			                        String expectedMigrationBackScript) throws SQLException, IOException 
	{	
		// arrange
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		String oldSchema = TestUtil.getDatabaseSchema(template);
		template.execute(sqlToChangeSchema);  // modify original schema
		String newSchema = TestUtil.getDatabaseSchema(template);

		// act
		String actualMigrationScript = H2SchemaMigrator.updateDB(embeddedDatabase.getConnection(), 
				                                                  newSchema, oldSchema);  // migrate back to original schema
		
		// assert
		assertEquals(expectedMigrationBackScript, actualMigrationScript, "Generated Migration script");
		assertEquals(TestUtil.sortStatements(oldSchema), 
				     TestUtil.sortStatements(TestUtil.getDatabaseSchema(template)), 
				     "DB Schema");
	}
}
