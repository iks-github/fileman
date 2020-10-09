package de.iksgmbh.dbschemacomp.helper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import de.iksgmbh.dbschemacomp.domain.SchemaDiff;
import de.iksgmbh.dbschemacomp.domain.TableDiff;

/**
 * These tests depend on successful execution of those in SchemaParserTest.
 * 
 * @author Reik Oberrath
 */
public class SchemaComparerTest 
{
	@Test
	void comparesTwoIdenticalSchemas() 
	{
		// arrange
		String schema = " CREATE  TABLE table_name " + System.getProperty("line.separator")
				        + " ( column1  datatype1,  column2  datatype2 ) ";
		
		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema, schema);
		
		// assert
		assertNotNull(result);
		assertEquals(0, result.getNumberOfNewTables(), "Number of New Tables");
		assertEquals(0, result.getNumberOfModifiedTables(), "Number of New Tables");
		assertEquals(0, result.getNumberOfRemovedTables(), "Number of New Tables");
	}

	@Test
	void comparesWithNewTable() 
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1  datatype1);";
		String schema2 = schema1 + "CREATE TABLE table2 (column2  datatype2)";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		assertNotNull(result);
		assertEquals(1, result.getNumberOfNewTables(), "Number of New Tables");
		assertEquals(0, result.getNumberOfModifiedTables(), "Number of Modified Tables");
		assertEquals(0, result.getNumberOfRemovedTables(), "Number of Removed Tables");
	}

	@Test
	void comparesWithTwoRemovedTables() 
	{
		// arrange
		String schema2 = "CREATE TABLE table1 (column1  datatype1);";
		String schema1 = schema2 + "CREATE TABLE table2 (column2  datatype2);"
				                 + "CREATE TABLE table3 (column3  datatype3);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);

		// assert
		assertNotNull(result);
		assertEquals(0, result.getNumberOfNewTables(), "Number of New Tables");
		assertEquals(0, result.getNumberOfModifiedTables(), "Number of Modified Tables");
		assertEquals(2, result.getNumberOfRemovedTables(), "Number of Removed Tables");
	}

	@Test
	void comparesWithModifiedTable_OneNewAndOneRemovedColumn() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype1, column2 datatype2);";
		String schema2 = "CREATE TABLE table (column1 datatype1, column3 datatype3);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		assertNotNull(result);
		assertEquals(0, result.getNumberOfNewTables(), "Number of New Tables");
		assertEquals(1, result.getNumberOfModifiedTables(), "Number of Modified Tables");
		assertEquals(0, result.getNumberOfRemovedTables(), "Number of Removed Tables");

		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(1, tableDiff.getNumberOfNewColumns(), "Number of New Columns");
		assertEquals(1, tableDiff.getNumberOfRemovedColumns(), "Number of Removed Columns");
		assertEquals(0, tableDiff.getNumberOfModifiedColumns(), "Number of Modified Columns");
	}
	
	@Test
	void comparesWithModifiedTable_ModifiedColumnType() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype1);";
		String schema2 = "CREATE TABLE table (column1 datatype2);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		assertNotNull(result);
		assertEquals(0, result.getNumberOfNewTables(), "Number of New Tables");
		assertEquals(1, result.getNumberOfModifiedTables(), "Number of Modified Tables");
		assertEquals(0, result.getNumberOfRemovedTables(), "Number of Removed Tables");

		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(0, tableDiff.getNumberOfNewColumns(), "Number of New Columns");
		assertEquals(0, tableDiff.getNumberOfRemovedColumns(), "Number of Removed Columns");
		assertEquals(1, tableDiff.getNumberOfModifiedColumns(), "Number of Modified Columns");
	}

	@Test
	void comparesWithModifiedTable_NullableStateRemoved() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype not null);";
		String schema2 = "CREATE TABLE table (column1 datatype);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(true, tableDiff.getModifiedColumns().get(0).getNewNullableState(), "Nullable State");
	}

	@Test
	void comparesWithModifiedTable_NewNullableState() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype);";
		String schema2 = "CREATE TABLE table (column1 datatype not null);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(false, tableDiff.getModifiedColumns().get(0).getNewNullableState(), "Nullable State");
	}

	@Test
	void comparesWithModifiedTable_DefaultValueRemoved() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype default aValue);";
		String schema2 = "CREATE TABLE table (column1 datatype);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals("", tableDiff.getModifiedColumns().get(0).getNewDefault(), "Default Value");
	}	
	
	@Test
	void comparesWithModifiedTable_NewDefaultValue() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype);";
		String schema2 = "CREATE TABLE table (column1 datatype default aValue);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals("avalue", tableDiff.getModifiedColumns().get(0).getNewDefault(), "Default Value");
	}	

	@Test
	void comparesWithModifiedTable_NewPrimaryKey() 
	{
		// arrange
		String schema1 = "CREATE TABLE table (column1 datatype);";
		String schema2 = "CREATE TABLE table (column1 datatype, primary key (columns));";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(null, tableDiff.getOldPrimaryKey(), "Old Primary Key");
		assertEquals("(columns)", tableDiff.getNewPrimaryKey(), "New Primary Key");
	}	
	
	
	@Test
	void comparesWithModifiedTable_NewUniqueConstraint() 
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";
		String schema2 = "CREATE TABLE table1 (column1 datatype, column2 datatype);"
				         + "alter table table1 add constraint constaintId1 unique (column1);"
                         + "alter table table1 add constraint constaintId2 unique (column2)";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(2, tableDiff.getNewAddConstraintStatements().size(), "number of new unique constarints");
		assertEquals("ALTER TABLE TABLE1 ADD CONSTRAINT CONSTAINTID1 UNIQUE (COLUMN1)", tableDiff.getNewAddConstraintStatements().get(0), "Unique Constraint Statement");
		assertEquals("ALTER TABLE TABLE1 ADD CONSTRAINT CONSTAINTID2 UNIQUE (COLUMN2)", tableDiff.getNewAddConstraintStatements().get(1), "Unique Constraint Statement");
	}	

	@Test
	void comparesWithModifiedTable_UniqueConstraintRemoved() 
	{
		// arrange
		String schema1 = "CREATE TABLE table1 (column1 datatype, column2 datatype);"
				         + "alter table table1 add constraint constaintId1 unique (column1);"
                         + "alter table table1 add constraint constaintId2 unique (column2)";
		String schema2 = "CREATE TABLE table1 (column1 datatype, column2 datatype);";

		// act
		SchemaDiff result = SchemaComparer.doYourJob(schema1, schema2);
		
		// assert
		TableDiff tableDiff = result.getTableDiff(1);
		assertEquals(2, tableDiff.getAddConstraintIdsToRemove().size(), "number of unique constarints to remove");
		assertEquals("CONSTAINTID1", tableDiff.getAddConstraintIdsToRemove().get(0), "Unique Constraint Statement");
		assertEquals("CONSTAINTID2", tableDiff.getAddConstraintIdsToRemove().get(1), "Unique Constraint Statement");
	}	
	
}
