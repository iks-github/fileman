package de.iksgmbh.dbschemacomp.domain;

public class ColumnDiff 
{
	private Name oldColumnName;
	private Name newName;
	private Type oldColumnType;
	private Type newType;
	private String newDefault;
	private Boolean newNullableState;

	public ColumnDiff(Name aName, Type aType) {
		this.oldColumnName = aName;
		this.oldColumnType = aType;
	}

	@Override
	public String toString() {
		return oldColumnName + " (" + getNumberOfChanges() + " changes)";
	}
	
	public Name getOldName() {
		return oldColumnName;
	}

	public Type getOldType() {
		return oldColumnType;
	}

	public Name getNewName() {
		return newName;
	}

	public void setNewName(Name newName) {
		this.newName = newName;
	}

	public Type getNewType() {
		return newType;
	}

	public void setNewType(Type newType) {
		this.newType = newType;
	}

	public String getNewDefault() {
		return newDefault;
	}

	public void setNewDefault(String newDefault) {
		this.newDefault = newDefault;
	}

	public Boolean getNewNullableState() {
		return newNullableState;
	}

	public void setNewNullableState(Boolean newNullableState) {
		this.newNullableState = newNullableState;
	}

	public int getNumberOfChanges() 
	{
		int count = 0;
		if (newType != null) count++;
		if (newDefault != null) count++;
		if (newNullableState != null) count++;
		return count;
	}
	
}
