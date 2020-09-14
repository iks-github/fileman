package de.iksgmbh.dbschemacomp.domain;

public class Name 
{
	private String value;

	public Name(String value) {
		if (value == null) throw new IllegalArgumentException();
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	@Override
	public boolean equals(Object obj) 
	{
		if (obj instanceof Name) {
			Name t = (Name) obj;
			return value.equals(t.getValue());
		}
		return false;
	}
	
	@Override
	public String toString() {
		return value;
	}
}
