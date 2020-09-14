package de.iksgmbh.dbschemacomp.helper;

import de.iksgmbh.dbschemacomp.domain.ColumnDiff;
import de.iksgmbh.dbschemacomp.domain.ColumnMetaData;
import de.iksgmbh.dbschemacomp.domain.Name;
import de.iksgmbh.dbschemacomp.domain.SchemaDiff;
import de.iksgmbh.dbschemacomp.domain.TableDiff;
import de.iksgmbh.dbschemacomp.domain.Type;

public class MigrationScriptGenerator 
{
	private SchemaDiff schemaDiff;
	
	public MigrationScriptGenerator(SchemaDiff aSchemaDiff) {
		schemaDiff = aSchemaDiff;
	}

	public static String doYourJob(SchemaDiff aSchemaDiff) {
		return new MigrationScriptGenerator(aSchemaDiff).generate();
	}

	private String generate() 
	{
		StringBuffer script = new StringBuffer();
		
		schemaDiff.getNewTableCreateStatements()
		          .forEach(statement -> script.append(statement).append(";")
		        		                      .append(System.getProperty("line.separator")));
	
		schemaDiff.getRemovedTableNames()
                  .forEach(name -> script.append("drop table ").append(name).append(";")
      		                             .append(System.getProperty("line.separator")));
		
		schemaDiff.getModifiedTables()
		          .forEach(tableDiff -> script.append(generateChangeStatements(tableDiff))
                                              .append(System.getProperty("line.separator")));
	
		return script.toString().trim();
	}

	private String generateChangeStatements(TableDiff tableDiff) 
	{
		StringBuffer script = new StringBuffer();

		tableDiff.getNewColumns()
                 .forEach(columnDiff -> script.append("ALTER TABLE ").append(tableDiff.getTableName())
                		                      .append(" ADD ").append(generateColumnData(columnDiff))
      		                                  .append(System.getProperty("line.separator")));

		tableDiff.getRemovedColumns()
                 .forEach(name -> script.append("ALTER TABLE DROP COLUMN ").append(name).append(";")
	                                    .append(System.getProperty("line.separator")));
		
		tableDiff.getModifiedColumns()
                 .forEach(columnDiff -> script.append("ALTER TABLE ").append(tableDiff.getTableName())
                                              .append(" ALTER COLUMN ").append(generateColumnData(columnDiff))
                                              .append(System.getProperty("line.separator")));

		checkPrimaryKey(tableDiff, script);
		return script.toString().trim();
	}

	private void checkPrimaryKey(TableDiff tableDiff, StringBuffer script) 
	{
		if (tableDiff.getOldPrimaryKey() == null){
			if (tableDiff.getNewPrimaryKey() != null) {
				addPrimaryKey(tableDiff, script);
			}
		} else {
			if (tableDiff.getNewPrimaryKey() == null) {
				dropPrimaryKey(tableDiff, script);
			} else {
				if ( ! tableDiff.getNewPrimaryKey().equals(tableDiff.getOldPrimaryKey())) {
					dropPrimaryKey(tableDiff, script);
					addPrimaryKey(tableDiff, script);
				}
			}
		}
	}

	private void dropPrimaryKey(TableDiff tableDiff, StringBuffer script) {
		script.append("ALTER TABLE ").append(tableDiff.getTableName())
		  .append(" DROP PRIMARY KEY;").append(System.getProperty("line.separator"));
	}

	private void addPrimaryKey(TableDiff tableDiff, StringBuffer script) {
		script.append("ALTER TABLE ").append(tableDiff.getTableName())
		      .append(" ADD PRIMARY KEY ").append(tableDiff.getNewPrimaryKey())
		      .append(";").append(System.getProperty("line.separator"));
	}

	private String generateColumnData(ColumnDiff columnDiff) 
	{
		Name columnName = columnDiff.getNewName();
		if (columnName == null) columnName = columnDiff.getOldName();
		
		Type columnType = columnDiff.getNewType();
		if (columnType == null) columnType = columnDiff.getOldType();
		
		String toReturn = columnName.getValue() + " " + columnType.getValue();
		
		if ( columnDiff.getNewNullableState() != null) {
			if (columnDiff.getNewNullableState()) {
				toReturn += " null";
			} else {
				toReturn += " not null";
			}
		}
		
		if (columnDiff.getNewDefault() != null 
			&& columnDiff.getNewDefault().trim().length() > 0) 
		{
			toReturn += " default " + columnDiff.getNewDefault();
		}
		
		return toReturn + ";";
	}
	
	private String generateColumnData(ColumnMetaData columnMetaData) 
	{
		String toReturn = columnMetaData.getColumnName().getValue() + 
				          " " + columnMetaData.getColumnType().getValue();
		
		if ( ! columnMetaData.isNullable() ) {
			toReturn += " not null";
		}
		
		if (columnMetaData.getDefault() != null) {
			toReturn += " default " + columnMetaData.getDefault();
		}
		
		return toReturn + ";";
	}
}
