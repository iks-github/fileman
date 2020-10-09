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

/**
 * Tests the migration from H2DbSchema2 to H2DbSchema1 
 * 
 * @author Reik Oberrath
 */
public class H2SchemaMigratorTest2 {
	
	private static EmbeddedDatabase embeddedDatabase;
	
	@BeforeAll
	public static void init() {
		new File("injectedUpdateScript.sql").delete();
		new File("failingUpdateScript.sql").delete();

		embeddedDatabase = new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2)
				                                        .setCommentPrefix("--")
				                                        .addScript("H2DbSchema2.txt").build();
	}
	
	@AfterAll
	public static void cleanup() {
		new File("injectedUpdateScript.sql").delete();
		new File("failingUpdateScript.sql").delete();
		embeddedDatabase.shutdown();
	}

	@Test
	public void migratesComplexDbSchema() throws SQLException, IOException 
	{
		// arrange
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		String oldSchema = TestUtil.getDatabaseSchema(template);
		String newSchema = FileUtil.readTextFile("src/test/resources/H2DbSchema1.txt");
		String expected = FileUtil.readTextFile("src/test/resources/ExpectedUpdateScript2.txt");
		FileUtil.writeTextFile("injectedUpdateScript.sql", expected);
		
		// act
		String actualMigrationScript = H2SchemaMigrator.updateDB(embeddedDatabase.getConnection(), 
				                                                  oldSchema, newSchema);  // migrate back to original schema
		
		// cleanup
		new File("injectedUpdateScript.sql").delete();
		
		// assert
		assertEquals(expected, actualMigrationScript, "Generated Migration script");		
	}	

}
