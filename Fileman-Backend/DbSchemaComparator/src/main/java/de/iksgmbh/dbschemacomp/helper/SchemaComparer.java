package de.iksgmbh.dbschemacomp.helper;

import java.util.ArrayList;
import java.util.List;

import de.iksgmbh.dbschemacomp.domain.ColumnDiff;
import de.iksgmbh.dbschemacomp.domain.ColumnMetaData;
import de.iksgmbh.dbschemacomp.domain.Name;
import de.iksgmbh.dbschemacomp.domain.SchemaDiff;
import de.iksgmbh.dbschemacomp.domain.SchemaMetaData;
import de.iksgmbh.dbschemacomp.domain.SqlConstants;
import de.iksgmbh.dbschemacomp.domain.TableDiff;
import de.iksgmbh.dbschemacomp.domain.TableMetaData;
import de.iksgmbh.dbschemacomp.domain.Type;

public class SchemaComparer extends SqlConstants
{
	private SchemaMetaData schema1;
	private SchemaMetaData schema2;
	
	public SchemaComparer(SchemaMetaData aSchema, SchemaMetaData anotherSchema) {
		schema1 = aSchema;
		schema2 = anotherSchema;
	}

	public static SchemaDiff doYourJob(String schemaSql1, String schemaSql2) 
	{
		return new SchemaComparer(SchemaParser.doYourJob(schemaSql1),
				                  SchemaParser.doYourJob(schemaSql2)).compare();
	}

	private SchemaDiff compare() 
	{
		SchemaDiff toReturn = new SchemaDiff();
		
		List<Name> tableNameMatches = compareTablesByName(toReturn);
		compareTablesByColumns(toReturn, tableNameMatches);
		compareTablesByPrimaryKey(toReturn, tableNameMatches);
		
		return toReturn;
	}

	private void compareTablesByPrimaryKey(SchemaDiff toReturn, List<Name> tableNameMatches) 
	{
		for (Name name : tableNameMatches) 
		{
			TableDiff tableDiff = toReturn.getTableDiff(name);
			boolean newTableDiff = false;
			if (tableDiff == null) {
				tableDiff = new TableDiff(name);
				newTableDiff = true;
			}
			String pk1 = schema1.getTable(name).getPrimaryKey();
			String pk2 = schema2.getTable(name).getPrimaryKey();
			boolean diff = false;
			if (pk1 == null) {
				if (pk2 != null) {
					tableDiff.setNewPrimaryKey(pk2);
					diff = true;
				}
			} else {
				if (pk2 == null) {
					tableDiff.setOldPrimaryKey(pk1);
					diff = true;
				} else {
					if (! pk1.equals(pk2)) {
						tableDiff.setOldPrimaryKey(pk1);
						tableDiff.setNewPrimaryKey(pk2);
						diff = true;
					}
				}
			}
			tableDiff.getNumberOfChanges();
			if (diff && newTableDiff) toReturn.addModifiedTable(tableDiff);
		}
	}

	private void compareTablesByColumns(SchemaDiff toReturn, 
			                            List<Name> tableNameMatches) 
	{
		for (Name name : tableNameMatches) 
		{
			TableMetaData table1 = schema1.getTable(name);
			TableMetaData table2 = schema2.getTable(name);
			TableDiff tableDiff = new TableDiff(name);
			List<Name> columnNameMatches = compareTablesByColumnName(tableDiff, table1, table2);
			compareColumnsByAttributes(tableDiff, columnNameMatches, table1, table2);
			compareColumnsByUniqueness(tableDiff, columnNameMatches, table1, table2);
			if (tableDiff.getNumberOfChanges() > 0) {				
				toReturn.addModifiedTable(tableDiff);
			}
		}
		
	}

	private void compareColumnsByUniqueness(TableDiff tableDiff, 
			                                List<Name> columnNameMatches, 
			                                TableMetaData table1, TableMetaData table2) 
	{
		if (table1.getUniqueConstraintStatement() == null 
			&& table2.getUniqueConstraintStatement() == null) {
			return;
		}
		
		if (table1.getUniqueConstraintStatement() == null) {
			tableDiff.setUniqueConstraintStatement(table2.getUniqueConstraintStatement());
			return;
		}

		if (table1.getUniqueConstraintStatement().equals(table2.getUniqueConstraintStatement())) {
			return;
		}

		String constraintId = extractConstraintId(table1.getUniqueConstraintStatement());
		tableDiff.setUniqueConstraintStatement("alter table " + table1.getTableName() 
		                                        + " drop constraint " + constraintId + ";");
	}

	private String extractConstraintId(String uniqueConstraintStatement) 
	{
		int pos = uniqueConstraintStatement.indexOf(ALTER_TABLE_TYPE_ADD_CONSTRAINT);
		pos += ALTER_TABLE_TYPE_ADD_CONSTRAINT.length();
		String toReturn = uniqueConstraintStatement.substring(pos).trim();
		pos = toReturn.indexOf(" ");
		return toReturn.substring(0, pos).trim();
	}

	private void compareColumnsByAttributes(TableDiff tableDiff, 
			                                List<Name> columnNameMatches, 
			                                TableMetaData table1, 
			                                TableMetaData table2) 
	{
		for (Name name : columnNameMatches) 
		{
			ColumnMetaData column1 = table1.getColumn(name);
			ColumnMetaData column2 = table2.getColumn(name);
			ColumnDiff columnDiff = getColumnDiff(column1, column2);
			if (columnDiff.getNumberOfChanges() > 0) {
				tableDiff.addModifiedColumns(columnDiff);
			}
		}
	}

	private ColumnDiff getColumnDiff(ColumnMetaData column1, 
			                         ColumnMetaData column2) 
	{
		ColumnDiff columnDiff = new ColumnDiff(column1.getColumnName(), column1.getColumnType());
		columnDiff.setNewName(column2.getColumnName());

		if (doesTypeDiffer(column1.getColumnType(), column2.getColumnType())) {
			columnDiff.setNewType(column2.getColumnType());
		}
		
		if (doesNullableDiffer(column1.isNullable(), column2.isNullable())) {
			columnDiff.setNewNullableState(column2.isNullable());
		}

		if (doesDefaultDiffer(column1.getDefault(), column2.getDefault())) {
			if (column2.getDefault() == null) {
				columnDiff.setNewDefault("");
			} else {				
				columnDiff.setNewDefault(column2.getDefault());
			}
		}

		return columnDiff;
	}

	private boolean doesDefaultDiffer(String default1, String default2) 
	{
		if (default1 == null) {
			if (default2 == null) return false;
			return true;
		}
		
		if (default2 == null) return true;
		return ! default1.equals(default2);
		}

	private boolean doesNullableDiffer(Boolean nullable1, Boolean nullable2) 
	{
		if (nullable1 == null) {
			if (nullable2 == null) return false;
			return true;
		}
		
		if (nullable2 == null) return true;
		return nullable1 != nullable2;
	}

	private boolean doesTypeDiffer(Type columnType1, Type columnType2) {
		return ! columnType1.equals(columnType2);
	}

	private List<Name> compareTablesByColumnName(TableDiff tableDiff, 
			                                     TableMetaData table1, 
			                                     TableMetaData table2) 
	{
		List<Name> columnList1 = table1.getColumnNames();
		List<Name> columnList2 = table2.getColumnNames();
		List<Name> newColumns = new ArrayList<>(columnList2);
		List<Name> removedColumns = new ArrayList<>(columnList1);
		List<Name> matches = new ArrayList<>();
		
		for (Name name : columnList1) 
		{
			if (columnList2.contains(name)) {
				newColumns.remove(name);
				removedColumns.remove(name);
				matches.add(name);
			}
		}
		
		newColumns.forEach(columnName -> tableDiff.addNewColum(table2.getColumn(columnName)));
		tableDiff.addRemovedColumns(removedColumns);
		return matches;
	}

	private List<Name> compareTablesByName(SchemaDiff diff) 
	{
		List<Name> tableList1 = schema1.getTableNames();
		List<Name> tableList2 = schema2.getTableNames();
		List<Name> newTables = new ArrayList<>(tableList2);
		List<Name> removedTables = new ArrayList<>(tableList1);
		List<Name> matches = new ArrayList<>();
		
		for (Name name : tableList1) 
		{
			if (tableList2.contains(name)) {
				newTables.remove(name);
				removedTables.remove(name);
				matches.add(name);
			}
		}
		
		newTables.forEach(tableName -> diff.addNewTableStatement(schema2.getTable(tableName).getCreateStatement()));
		diff.addRemovedTables(removedTables);
		return matches;
	}

}
