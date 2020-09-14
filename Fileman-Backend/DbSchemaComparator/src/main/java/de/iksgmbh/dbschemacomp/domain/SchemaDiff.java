package de.iksgmbh.dbschemacomp.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SchemaDiff 
{
	private List<String> newTableStatements = new ArrayList<>();
	private List<Name> removedTableNames = new ArrayList<>();
	private List<TableDiff> modifiedTables = new ArrayList<>();

	public List<String> getNewTableCreateStatements() {
		return newTableStatements;
	}

	public List<TableDiff> getModifiedTables() {
		return modifiedTables;
	}

	public List<Name> getRemovedTableNames() {
		return removedTableNames;
	}	
	
	@Override
	public String toString() {
		return this.getClass().getSimpleName() + " (" + getNumberOfChanges() + " changes)";
	}
	
	public int getNumberOfChanges() {
		return getNumberOfModifiedTables() + getNumberOfNewTables() + getNumberOfRemovedTables();
	}

	public int getNumberOfNewTables() {
		return newTableStatements.size();
	}

	public int getNumberOfModifiedTables() {
		return modifiedTables.size();
	}

	public int getNumberOfRemovedTables() {
		return removedTableNames.size();
	}

	public void addNewTableStatement(String createStatement) {
		newTableStatements.add(createStatement);
	}

	public void addRemovedTables(List<Name> tableList) {
		removedTableNames.addAll(tableList);
	}

	public void addModifiedTable(TableDiff tableDiff) {
		modifiedTables.add(tableDiff);
	}

	public TableDiff getTableDiff(int position) {
		if (modifiedTables.size() < position) return null;
		return modifiedTables.get(position-1);
	}

	public TableDiff getTableDiff(Name tableName) 
	{
		Optional<TableDiff> match = modifiedTables.stream()
		              .filter(table -> table.getTableName().equals(tableName))
		              .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

}
