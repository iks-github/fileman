package de.iksgmbh.dbschemacomp;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class H2SchemaMigrationTest {
	
	private static EmbeddedDatabase embeddedDatabase;
	
	@BeforeAll
	private static void init() {
		embeddedDatabase = new EmbeddedDatabaseBuilder()
				.setType(EmbeddedDatabaseType.H2)
				.addScript("H2DbSchema.txt").build();
	}
	
	@Test
	public void migratesSimpleDbSchema() throws SQLException, IOException {
		
		// arrange
		
		JdbcTemplate template = new JdbcTemplate(embeddedDatabase);
		template.execute("create table NEW_TABLE_FROM_TEST (ID INT);");
		
		exportEmbeddedDatabaseSchemaToFile(template);

		// act
		
		// assert
		
	}
	
	private void exportEmbeddedDatabaseSchemaToFile(JdbcTemplate template) throws IOException {
		
		List<String> outputSqlRows = new ArrayList<String>();
		
		SqlRowSet tableNames = template.queryForRowSet(
				"SELECT table_name FROM INFORMATION_SCHEMA.TABLES "
				+ "where sql is not null order by id;");
		
		while (tableNames.next()) {
			
			String tableName = tableNames.getString("table_name");
			
			SqlRowSet columns = template.queryForRowSet(
					"SELECT column_name, column_type "
					+ "FROM INFORMATION_SCHEMA.COLUMNS "
					+ "where table_schema = 'PUBLIC' "
					+ "and table_name = '" + tableName + "' "
					+ "order by ordinal_position;");
			
			String createTableRow = "create table " + tableName + " (";
			boolean firstColumn = true;
			
			while (columns.next()) {

				String columnName = columns.getString("column_name");
				String columnType = columns.getString("column_type").toLowerCase();
				
				if (firstColumn) {
					firstColumn = false;
				} else {
					createTableRow += ", ";
				}
				
				createTableRow += columnName+" "+columnType;
			}
			
			SqlRowSet primaryKey = template.queryForRowSet(
					"SELECT column_list FROM INFORMATION_SCHEMA.CONSTRAINTS "
					+ "where constraint_type = 'PRIMARY KEY' "
					+ "and table_name = '" + tableName + "';");
			
			if (primaryKey.next()) {
				createTableRow += ", primary key (" 
						+ primaryKey.getString("column_list") + ")";
			}
			
			createTableRow += ");\n";
			
			createTableRow = replaceDynamicSubstring(createTableRow, 
					"default next value for \"public\".\"system_sequence_",
					"\" ", "generated by default as identity");
			
			createTableRow = replaceDynamicSubstring(createTableRow, 
					"not null null_to_default sequence \"public\".\"system_sequence_",
					"\"", "");
			
			outputSqlRows.add(createTableRow);
		}
		
		SqlRowSet uniqueConstraints = template.queryForRowSet(
				"SELECT constraint_name, table_name, column_list "
				+ "FROM INFORMATION_SCHEMA.CONSTRAINTS "
				+ "where constraint_type = 'UNIQUE'");
		
		while (uniqueConstraints.next()) {
			String constraintName = uniqueConstraints.getString("constraint_name");
			String tableName = uniqueConstraints.getString("table_name");
			String columnList = uniqueConstraints.getString("column_list");

			String addUniqueConstraintRow = 
					"alter table " + tableName + " add constraint "
					+ constraintName + " unique (" + columnList + ");\n";
			
			outputSqlRows.add(addUniqueConstraintRow);
		}
		
		String fileName = "target/test_output.sql";
        
        try (FileOutputStream fileOutputStream = new FileOutputStream(fileName)) {
            for (String outputSqlRow: outputSqlRows) {
            	byte[] rowBytes = outputSqlRow.getBytes();
            	fileOutputStream.write(rowBytes);
            }
        }
	}

	private String replaceDynamicSubstring(String fullOriginalString, 
			String replaceFrom, String replaceTo, String replacement) {
		if (fullOriginalString.contains(replaceFrom)) {
			int beginIndex = fullOriginalString.indexOf(replaceFrom);
			int endIndex = fullOriginalString.indexOf(replaceTo, beginIndex + replaceFrom.length());
			String substringToReplace = fullOriginalString.substring(beginIndex, endIndex + replaceTo.length());
			return fullOriginalString.replace(substringToReplace, replacement);
		}
		return fullOriginalString;
	}
}
