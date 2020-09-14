package de.iksgmbh.dbschemacomp.domain;

public class Type 
{
	private String value;

	public Type(String value) {
		if (value == null) throw new IllegalArgumentException();
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
	@Override
	public String toString() {
		return value;
	}
	
	@Override
	public boolean equals(Object obj) 
	{
		if (obj instanceof Type) {
			Type t = (Type) obj;
			return value.equals(t.getValue());
		}
		return false;
	}
}
