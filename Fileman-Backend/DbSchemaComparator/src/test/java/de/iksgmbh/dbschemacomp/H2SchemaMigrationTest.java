package de.iksgmbh.dbschemacomp;

import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.h2.command.ddl.SchemaCommand;
import org.h2.tools.RunScript;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class H2SchemaMigrationTest 
{
	private Connection dbConnect;
	
	@BeforeEach
    private void init() {
		try {
			dbConnect =  DriverManager.getConnection("jdbc:h2:mem:test", "sa", "");
			dbConnect.setAutoCommit(true);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void migratesSimpleDbSchema() throws SQLException
	{
		// arrange
		dbConnect.createStatement().execute("create table A (id int(11));");
		ResultSet executeQuery = dbConnect.createStatement().executeQuery("show tables");
		//RunScript.execute(dbConnect, new StringReader("create table B (id varchar);"));
		System.err.println(executeQuery.getString(1));
		
		// act
		
		// assert
		
	}


//	private DriverManagerDataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("org.h2.Driver");
//        dataSource.setUrl("jdbc:h2:mem:test");
//        dataSource.setUsername("sa");
//        dataSource.setPassword("");
//
//        Resource initSchema = new ClassPathResource("myscript.sql");
//        DatabasePopulator databasePopulator = new ResourceDatabasePopulator(initSchema);
//        DatabasePopulatorUtils.execute(databasePopulator, dataSource);
//
//        return dataSource;
//    }
//	
//	private EmbeddedDatabase createDb() {
//		return new EmbeddedDatabaseBuilder()
//                .setType(EmbeddedDatabaseType.H2)
//                .setName("testDb;DB_CLOSE_ON_EXIT=FALSE;MODE=Oracle;INIT=create " +
//                        "schema if not exists " +
//                        "schema_a\\;create schema if not exists schema_b;" +
//                        "DB_CLOSE_DELAY=-1;")
//                .addScript("sql/provPlan/createTable.sql")
//                .addScript("sql/provPlan/insertData.sql")
//                .addScript("sql/provPlan/insertSpecRel.sql")
//                .build();
//	}
}
