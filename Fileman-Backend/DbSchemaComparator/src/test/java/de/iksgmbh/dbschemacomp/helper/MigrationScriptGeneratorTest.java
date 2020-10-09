package de.iksgmbh.dbschemacomp.helper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.sql.SQLException;

import org.junit.jupiter.api.Test;

import de.iksgmbh.dbschemacomp.domain.SchemaDiff;

/**
 * These tests depend on successful execution of both 
 * those in SchemaComparerTest and SchemaParserTest.
 * 
 * @author Reik Oberrath
 */
class MigrationScriptGeneratorTest 
{
	@Test
	void generatesEmptyScriptForIdenticalSchemas() 
	{
		// arrange
		String schema = " CREATE  TABLE table_name " + System.getProperty("line.separator")
				        + " ( column1  datatype1,  column2  datatype2 ) ";
		SchemaDiff diff = SchemaComparer.doYourJob(schema, schema);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("", result, "Script");
	}
	
	@Test
	public void generatesScript_WithNewTable()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column datatype1);";
		String schema2 = "CREATE TABLE table1 (column datatype1);"
				       + "CREATE TABLE table2 (column datatype2);";
		SchemaDiff diff = SchemaComparer.doYourJob(schema1, schema2);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("CREATE TABLE TABLE2 (COLUMN DATATYPE2);", result, "Script");
	}

	@Test
	public void generatesScript_WithTableRemoved()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column datatype1);";
		String schema2 = "CREATE TABLE table1 (column datatype1);"
				       + "CREATE TABLE table2 (column datatype2);";
		SchemaDiff diff = SchemaComparer.doYourJob(schema2, schema1);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("drop table TABLE2;", result, "Script");
	}

	@Test
	public void generatesScriptWithModifiedTable_newColumn()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype);";
		String schema2 = "CREATE TABLE table1 (column1 datatype, column2 datatype not null default xy);";
		SchemaDiff diff = SchemaComparer.doYourJob(schema1, schema2);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ADD column2 datatype not null default xy;", result, "Script");
	}

	@Test
	public void generatesScriptWithModifiedTable_droppedColumn()
	{
		// arrange
		String schema1 = "CREATE TABLE TABLE1 (column1 datatype, column2 datatype not null default xy);";
		String schema2 = "CREATE TABLE TABLE1 (column1 datatype);";
		SchemaDiff diff = SchemaComparer.doYourJob(schema1, schema2);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 DROP COLUMN column2;", result, "Script");
	}
	
	@Test
	public void generatesScriptWithModifiedTable_modifiedColumn_datatype()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype1);";
		String schema2 = "CREATE TABLE table1 (column1 datatype2);";
		SchemaDiff diff = SchemaComparer.doYourJob(schema1, schema2);
		
		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype2;", result, "Script");
	}

	@Test
	public void generatesScriptWithModifiedTable_modifiedDefault()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype);";
		String schema2 = "CREATE TABLE table1 (column1 datatype default aDefaultValue1);";
		String schema3 = "CREATE TABLE table1 (column1 datatype default aDefaultValue2);";
		String schema4 = "CREATE TABLE table1 (column1 datatype);";
		SchemaDiff diff1 = SchemaComparer.doYourJob(schema1, schema2);
		SchemaDiff diff2 = SchemaComparer.doYourJob(schema2, schema3);
		SchemaDiff diff3 = SchemaComparer.doYourJob(schema3, schema4);
		
		// act
		String result1 = MigrationScriptGenerator.doYourJob(diff1);
		String result2 = MigrationScriptGenerator.doYourJob(diff2);
		String result3 = MigrationScriptGenerator.doYourJob(diff3);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype default adefaultvalue1;", result1, "Script");
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype default adefaultvalue2;", result2, "Script");
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype;", result3, "Script");
	}
	
	@Test
	public void generatesScriptWithModifiedTable_modifiedNullableState()
	{
		// arrange
		String schema1 = "CREATE TABLE TABLE1 (column1 datatype null);";
		String schema2 = "CREATE TABLE TABLE1 (column1 datatype not null);";
		String schema3 = "CREATE TABLE TABLE1 (column1 datatype);";
		SchemaDiff diff1 = SchemaComparer.doYourJob(schema1, schema2);
		SchemaDiff diff2 = SchemaComparer.doYourJob(schema2, schema3);
		
		// act
		String result1 = MigrationScriptGenerator.doYourJob(diff1);
		String result2 = MigrationScriptGenerator.doYourJob(diff2);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype not null;", result1, "Script");
		assertEquals("ALTER TABLE TABLE1 ALTER COLUMN column1 datatype null;", result2, "Script");
	}	

	
	@Test
	public void generatesScriptWithModifiedTable_modifiedPrimaryKey()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";
		String schema2 = "CREATE TABLE table1 (column1 datatype, column2 datatype, primary key (column1));";
		String schema3 = "CREATE TABLE table1 (column1 datatype, column2 datatype, primary key (column2));";
		String schema4 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";
		SchemaDiff diff1 = SchemaComparer.doYourJob(schema1, schema2);
		SchemaDiff diff2 = SchemaComparer.doYourJob(schema2, schema3);
		SchemaDiff diff3 = SchemaComparer.doYourJob(schema3, schema4);
		
		// act
		String result1 = MigrationScriptGenerator.doYourJob(diff1);
		String result2 = MigrationScriptGenerator.doYourJob(diff2);
		String result3 = MigrationScriptGenerator.doYourJob(diff3);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ADD PRIMARY KEY (column1);", result1, "Script");
		assertEquals("ALTER TABLE TABLE1 DROP PRIMARY KEY;" + System.getProperty("line.separator") +
				     "ALTER TABLE TABLE1 ADD PRIMARY KEY (column2);", result2, "Script");
		assertEquals("ALTER TABLE TABLE1 DROP PRIMARY KEY;", result3, "Script");
	}	

	@Test
	public void generatesScriptWithModifiedTable_UniqueConstraint()
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";
		String schema2 = "CREATE TABLE table1 (column1 datatype, column2 datatype);"
				         + "ALTER TABLE table1 ADD CONSTRAINT constaintId1 unique (column1)";
		String schema3 = "CREATE TABLE table1 (column1 datatype, column2 datatype);"
		                 + "ALTER TABLE table1 ADD CONSTRAINT constaintId2 unique (column2)";
		String schema4 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";
		SchemaDiff diff1 = SchemaComparer.doYourJob(schema1, schema2);
		SchemaDiff diff2 = SchemaComparer.doYourJob(schema2, schema3);
		SchemaDiff diff3 = SchemaComparer.doYourJob(schema3, schema4);
		
		// act
		String result1 = MigrationScriptGenerator.doYourJob(diff1);
		String result2 = MigrationScriptGenerator.doYourJob(diff2);
		String result3 = MigrationScriptGenerator.doYourJob(diff3);
		
		// assert
		assertEquals("ALTER TABLE TABLE1 ADD CONSTRAINT CONSTAINTID1 UNIQUE (COLUMN1);", result1, "Script");
		assertEquals("ALTER TABLE TABLE1 ADD CONSTRAINT CONSTAINTID2 UNIQUE (COLUMN2)\r\n" + 
				     "ALTER TABLE TABLE1 DROP CONSTRAINT CONSTAINTID1;", result2, "Script");
		assertEquals("ALTER TABLE TABLE1 DROP CONSTRAINT CONSTAINTID2;", result3, "Script");
	}	

	@Test
	public void generatesComplexUpdateScript() throws SQLException, IOException 
	{
		// arrange
		String schema1 = FileUtil.readTextFile("src/test/resources/H2DbSchema1.txt");
		String schema2 = FileUtil.readTextFile("src/test/resources/H2DbSchema2.txt");
		SchemaDiff diff = SchemaComparer.doYourJob(schema1, schema2);

		// act
		String result = MigrationScriptGenerator.doYourJob(diff);
		
		// assert
		assertEquals(FileUtil.readTextFile("src/test/resources/ExpectedUpdateScript.txt").trim(), result, "Generated Update Script");
	}		
}
