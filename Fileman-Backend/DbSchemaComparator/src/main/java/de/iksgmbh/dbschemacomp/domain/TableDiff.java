package de.iksgmbh.dbschemacomp.domain;

import java.util.ArrayList;
import java.util.List;

public class TableDiff 
{
	private Name tableName;
	private List<ColumnMetaData> newColumns = new ArrayList<>();
	private List<Name> removedColumns = new ArrayList<>();
	private List<ColumnDiff> modifiedColumns = new ArrayList<>();
	private String newPrimaryKey;
	private String oldPrimaryKey;
	private String uniqueConstraintStatement;
		
	public TableDiff(Name tableName) {
		this.tableName = tableName;
	}
	
	@Override
	public String toString() {
		return tableName + " (" + getNumberOfChanges() + " changes)";
	}

	public int getNumberOfChanges() 
	{
		int n = uniqueConstraintStatement == null ? 0 : 1;
		if (primaryKeyChange()) n++;
		return n 
			   + getNumberOfModifiedColumns() 
			   + getNumberOfNewColumns() 
			   + getNumberOfRemovedColumns();
	}

	private boolean primaryKeyChange() 
	{
		if (newPrimaryKey == null) {
			return oldPrimaryKey != null;
		} else {
			return ! newPrimaryKey.equals(oldPrimaryKey);
		}
	}

	public Name getTableName() {
		return tableName;
	}

	public int getNumberOfNewColumns() {
		return newColumns.size();
	}

	public int getNumberOfModifiedColumns() {
		return modifiedColumns.size();
	}

	public int getNumberOfRemovedColumns() {
		return removedColumns.size();
	}

	public void addNewColum(ColumnMetaData columnMetaData) {
		newColumns.add(columnMetaData);
	}

	public void addRemovedColumns(List<Name> columnList) {
		removedColumns.addAll(columnList);
	}
	
	public void addModifiedColumns(ColumnDiff columnDiff) {
		modifiedColumns.add(columnDiff);
	}

	public List<ColumnMetaData> getNewColumns() {
		return newColumns;
	}

	public List<ColumnDiff> getModifiedColumns() {
		return modifiedColumns;
	}

	public List<Name> getRemovedColumns() {
		return removedColumns;
	}

	public String getUniqueConstraintStatement() {
		return uniqueConstraintStatement;
	}
	
	public void setUniqueConstraintStatement(String statement) {
		uniqueConstraintStatement = statement;
	}

	public String getNewPrimaryKey() {
		return newPrimaryKey;
	}

	public void setNewPrimaryKey(String newPrimaryKey) {
		this.newPrimaryKey = newPrimaryKey;
	}

	public String getOldPrimaryKey() {
		return oldPrimaryKey;
	}

	public void setOldPrimaryKey(String oldPrimaryKey) {
		this.oldPrimaryKey = oldPrimaryKey;
	}
}
