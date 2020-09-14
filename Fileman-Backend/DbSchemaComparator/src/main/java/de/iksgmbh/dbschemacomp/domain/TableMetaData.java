package de.iksgmbh.dbschemacomp.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class TableMetaData 
{
	private Name tableName;
	private List<ColumnMetaData> columns;
	private String primaryKey;
	private String uniqueConstaintStatement;
	private String createStatement;

	public TableMetaData(String aTableName, String statement) {
		this(new Name(aTableName), statement);
	}
	
	public TableMetaData(Name tableName, String statement) {
		this.tableName = tableName;
		columns = new ArrayList<ColumnMetaData>();
		createStatement = statement;
	}
	
	public int getColumnNumber() {
		return columns.size();
	}
	
	public List<Name> getColumnNames() {
		return columns.stream().map(col -> col.getColumnName())
				      .collect(Collectors.toList());
	}

	public void addColumn(Name aColumnName, Type aColumnType) {
		columns.add(new ColumnMetaData(aColumnName, aColumnType));
	}

	public void addColumn(ColumnMetaData column) {
		columns.add(column);
	}
	
	public Name getTableName() {
		return tableName;
	}

	public List<ColumnMetaData> getColumns() {
		return columns;
	}

	public ColumnMetaData getColumn(int position) {
		if (columns.size() < position) return null;
		return columns.get(position-1);
	}	

	public ColumnMetaData getColumn(String name) {
		return getColumn(new Name(name));
	}
	
	public ColumnMetaData getColumn(Name name) 
	{
		Optional<ColumnMetaData> match = columns.stream()
				                                .filter(column -> column.getColumnName().equals(name))
				                                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		
		return null;
	}	
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return tableName.getValue() + "(" + columns.size() + " columns)";
	}

	public void setPrimaryKey(String aPrimaryKey) {
		primaryKey = aPrimaryKey;
	}

	public String getPrimaryKey() {
		return primaryKey;
	}

	public void setUniqueConstraintStatement(String statement) {
		uniqueConstaintStatement = statement;
	}

	public String getUniqueConstraintStatement() {
		return uniqueConstaintStatement;
	}

	public String getCreateStatement() {
		return createStatement;
	}

}
