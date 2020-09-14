package de.iksgmbh.dbschemacomp.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class SchemaMetaData 
{
	private List<TableMetaData> tables = new ArrayList<>();
	
	public void addTable(TableMetaData table) {
		tables.add(table);
	}
	
	public int getTableNumber() {
		return tables.size();
	}

	public List<Name> getTableNames() {
		return tables.stream().map(table -> table.getTableName()).collect(Collectors.toList());
	}

	public TableMetaData getTable(int position) {
		if (position > tables.size()) return null;
		return tables.get(position-1);
	}

	public TableMetaData getTable(String name) 
	{
		return getTable(new Name(name));
	}
	
	public TableMetaData getTable(Name name) 
	{
		Optional<TableMetaData> match = tables.stream()
				                              .filter(table -> table.getTableName().equals(name))
				                              .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		
		return null;
	}
	
	@Override
	public String toString() {
		return getTableNames().toString();
	}
}
