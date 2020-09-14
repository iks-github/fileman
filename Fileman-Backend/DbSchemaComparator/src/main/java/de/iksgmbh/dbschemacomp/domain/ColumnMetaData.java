package de.iksgmbh.dbschemacomp.domain;

public class ColumnMetaData 
{
	private Name columnName;
	private Type columnType;
	private Boolean isNullable;
	private String defaultValue;
	private String generationInfo;

	public ColumnMetaData(Name columnName, Type columnType, Boolean nullable) {
		this(columnName, columnType);
		this.isNullable = nullable;
	}

	public ColumnMetaData(Name columnName, Type columnType) {
		this.columnName = columnName;
		this.columnType = columnType;
	}

	public Name getColumnName() {
		return columnName;
	}

	public Type getColumnType() {
		return columnType;
	}

	public String getDefault() {
		return defaultValue;
	}

	public void setDefault(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public boolean isNullable() {
		if (isNullable == null) return true;
		return isNullable;
	}

	@Override
	public String toString() {
		return columnName.toString() + "/" + columnType.getValue();
	}

	public void setGenerationInfo(String info) {
		this.generationInfo = info;
	}

	public String getGenerationInfo() {
		return generationInfo;
	}
}
