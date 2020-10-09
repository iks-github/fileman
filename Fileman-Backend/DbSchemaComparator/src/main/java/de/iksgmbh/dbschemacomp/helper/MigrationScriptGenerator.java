package de.iksgmbh.dbschemacomp.helper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
	
		
		String result = script.toString().trim();
		return sortCommands(result);
	}

	private String sortCommands(String result) 
	{
		List<String> commands = Arrays.asList(result.split(System.getProperty("line.separator")));
		List<String> dropPrimaryKeysCommands = new ArrayList<>();
		List<String> createPrimaryKeysCommands = new ArrayList<>();
		List<String> dropColumnsCommands = new ArrayList<>();
		List<String> dropTableCommands = new ArrayList<>();
		List<String> miscCommands = new ArrayList<>();
		for (String command : commands) {
			if (command.toLowerCase().contains("drop column")) {
				dropColumnsCommands.add(command);
			} else if (command.toLowerCase().startsWith("drop table")) {
				dropTableCommands.add(command);
			} else if (command.toLowerCase().contains("drop primary key")) {
				dropPrimaryKeysCommands.add(command);
			} else if (command.toLowerCase().contains("add primary key")) {
				createPrimaryKeysCommands.add(command);
			} else {
				miscCommands.add(command);
			}
		}
		StringBuffer script = new StringBuffer();
		dropPrimaryKeysCommands.forEach(command -> script.append(command).append(System.getProperty("line.separator")));
		miscCommands.forEach(command -> script.append(command).append(System.getProperty("line.separator")));
		createPrimaryKeysCommands.forEach(command -> script.append(command).append(System.getProperty("line.separator")));
		dropColumnsCommands.forEach(command -> script.append(command).append(System.getProperty("line.separator")));
		dropTableCommands.forEach(command -> script.append(command).append(System.getProperty("line.separator")));
		return script.toString().trim();
	}

	private String generateChangeStatements(TableDiff tableDiff) 
	{
		StringBuffer script = new StringBuffer();

		tableDiff.getNewColumns()
                 .forEach(columnDiff -> script.append("ALTER TABLE ").append(tableDiff.getTableName())
                		                      .append(" ADD ").append(generateColumnData(columnDiff, tableDiff.getNewPrimaryKey()))
      		                                  .append(System.getProperty("line.separator")));

		tableDiff.getRemovedColumns()
                 .forEach(name -> script.append("ALTER TABLE ").append(tableDiff.getTableName()).append(" DROP COLUMN ")
                		                .append(name).append(";").append(System.getProperty("line.separator")));
		
		tableDiff.getModifiedColumns()
                 .forEach(columnDiff -> script.append("ALTER TABLE ").append(tableDiff.getTableName())
                                              .append(" ALTER COLUMN ").append(generateColumnData(columnDiff))
                                              .append(System.getProperty("line.separator")));

		checkPrimaryKey(tableDiff, script);
		checkUniqueConstraint(tableDiff, script);
		
		String toReturn = script.toString().trim();
		if ( ! toReturn.endsWith(";")) toReturn += ";";
		return toReturn;
	}

	private void checkUniqueConstraint(TableDiff tableDiff, StringBuffer script) 
	{
		tableDiff.getNewAddConstraintStatements()
		         .forEach(statement -> script.append(statement)
		        		                     .append(System.getProperty("line.separator")));

		tableDiff.getAddConstraintIdsToRemove()
                 .forEach(id -> script.append(createDropConstraintStatement(id, tableDiff.getTableName().getValue()))
       		                          .append(System.getProperty("line.separator")));
	}

	private String createDropConstraintStatement(String id, String tableName) {
		return "ALTER TABLE " + tableName +" DROP CONSTRAINT " + id + ";";
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
	
	private String generateColumnData(ColumnMetaData columnMetaData, String newPrimaryKey) 
	{
		String toReturn = columnMetaData.getColumnName().getValue() + 
				          " " + columnMetaData.getColumnType().getValue();
		
		boolean isPrimaryKeyColumn = newPrimaryKey != null && 
				                     newPrimaryKey.contains(columnMetaData.getColumnName().getValue()); 
		
		if ( isPrimaryKeyColumn || ! columnMetaData.isNullable() ) {
			toReturn += " not null";
		}
		
		if (columnMetaData.getDefault() != null) {
			toReturn += " default " + columnMetaData.getDefault();
		}
		
		return toReturn + ";";
	}
}
