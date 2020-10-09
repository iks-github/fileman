package de.iksgmbh.dbschemacomp;

import java.io.File;
import java.sql.Connection;

import de.iksgmbh.dbschemacomp.domain.SchemaDiff;
import de.iksgmbh.dbschemacomp.domain.SchemaMetaData;
import de.iksgmbh.dbschemacomp.helper.FileUtil;
import de.iksgmbh.dbschemacomp.helper.MigrationScriptGenerator;
import de.iksgmbh.dbschemacomp.helper.SchemaComparer;
import de.iksgmbh.dbschemacomp.helper.SchemaParser;

public class H2SchemaMigrator 
{
	public static String updateDB(Connection connection, String oldSchema, String newSchema) 
	{
		File injectedUpdateScriptFile = new File("injectedUpdateScript.sql");
		String updateScript;
		if (injectedUpdateScriptFile.exists()) {
			updateScript = FileUtil.readTextFile(injectedUpdateScriptFile.getName());
		} else {			
			updateScript = createUpdateScript(oldSchema, newSchema);
		}
		
		try {
			connection.createStatement().execute(updateScript);
		} catch (Exception e) {
			System.err.println("The db schema defined by JPA has changed and the SchemaMigrator could not update the DB automatically."
					           + " The database must be recreated!");
			System.err.println("############################################################");
			System.err.println("old schema:");
			System.err.println(oldSchema);
			System.err.println("############################################################");
			System.err.println("new schema:");
			System.err.println(newSchema);
			System.err.println("############################################################");
			System.err.println("generated update script:");
			System.err.println(updateScript);
			// TODO add message to log
			System.err.println("############################################################");
			System.err.println("Reason:");
			System.err.println("############################################################");
			System.err.println(e.getMessage());
			FileUtil.writeTextFile("failingUpdateScript.sql", updateScript);
			return null;
		}
		return updateScript;
	}

	public static String createUpdateScript(String oldSchemaAsString, String newSchemaAsString) 
	{
		SchemaMetaData schema1 = SchemaParser.doYourJob(oldSchemaAsString);
		SchemaMetaData schema2 = SchemaParser.doYourJob(newSchemaAsString);
		SchemaDiff schemaDiff = new SchemaComparer(schema1, schema2).compare();
		return MigrationScriptGenerator.doYourJob(schemaDiff);
	}
}
