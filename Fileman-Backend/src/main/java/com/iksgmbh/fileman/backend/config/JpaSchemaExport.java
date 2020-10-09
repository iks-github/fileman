package com.iksgmbh.fileman.backend.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.Stream;

import org.hibernate.cfg.AvailableSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import com.iksgmbh.fileman.backend.dao.DbSchemaDao;



/**
 * Exports the db schema defined by the JPA annotations in the domain object classes
 * whenever the Fileman Backend starts up.
 * 
 * @author Reik Oberrath
 */
@Configuration  // activate if needed
public class JpaSchemaExport implements CommandLineRunner 
{
	private static final String DB_SCHEMA_CREATION_DLL_SQL = "./target/dbSchemaCreationDLL.sql";
	
	@Autowired
	private DbSchemaDao dbSchemaDao;

	@Autowired
	private LocalContainerEntityManagerFactoryBean entityManagerFactory;

	@Override
	public void run(String... args) throws Exception 
	{
		File f = new File(DB_SCHEMA_CREATION_DLL_SQL);
		f.delete();  // schema will be appended, so delete old content first!
		
		final Properties persistenceProperties = new Properties();
		persistenceProperties.setProperty(AvailableSettings.JPA_PERSISTENCE_PROVIDER, "org.hibernate.jpa.HibernatePersistenceProvider");
		// alternativ: "org.springframework.orm.jpa.persistenceunit.SmartPersistenceUnitInfo.SpringHibernateJpaPersistenceProvider"

		persistenceProperties.setProperty(AvailableSettings.JPA_JDBC_URL, "jdbc:h2:mem:testdb");
		persistenceProperties.setProperty(AvailableSettings.JPA_JDBC_DRIVER, "org.h2.Driver");
		persistenceProperties.setProperty(AvailableSettings.JPA_JDBC_USER, "Salomon");
		persistenceProperties.setProperty(AvailableSettings.JPA_JDBC_PASSWORD, "");
		persistenceProperties.setProperty(AvailableSettings.DIALECT, "org.hibernate.dialect.H2Dialect");

//		 persistenceProperties.setProperty(AvailableSettings.HBM2DDL_AUTO, "");
//		 persistenceProperties.setProperty(AvailableSettings.HBM2DDL_DATABASE_ACTION, "none");
//		 persistenceProperties.setProperty(AvailableSettings.HBM2DDL_CREATE_NAMESPACES, "true");
		
		// define creation of schema generation script
		persistenceProperties.setProperty(AvailableSettings.HBM2DDL_SCRIPTS_ACTION, "create");
		persistenceProperties.setProperty(AvailableSettings.HBM2DDL_CREATE_SOURCE, "metadata");
		persistenceProperties.setProperty(AvailableSettings.HBM2DDL_SCRIPTS_CREATE_TARGET, DB_SCHEMA_CREATION_DLL_SQL);

		entityManagerFactory.getJpaVendorAdapter().getPersistenceProvider().generateSchema(entityManagerFactory.getPersistenceUnitInfo(), persistenceProperties);

//      This following lines are not needed, because H2 updates an existing schema already automatically !		
//		List<DbSchema> schemaHistory = dbSchemaDao.findAllDbSchemas();
//		String currentDbSchemaSQL = readTextFileToString(f);
//		if (schemaHistory.size() == 0) {
//			DbSchema newSchema = new DbSchema();
//			newSchema.setCreationDate(new Date());
//			newSchema.setSql(currentDbSchemaSQL);
//			dbSchemaDao.create(newSchema);
//		}
//		else 
//		{
//			DbSchema latestDbSchema = schemaHistory.get(schemaHistory.size()-1);
//			if (! currentDbSchemaSQL.equals(latestDbSchema.getSql())) {
//				String result = H2SchemaMigrator.updateDB(createDbConnetction(), latestDbSchema.getSql(), currentDbSchemaSQL);
//				if (result == null) System.exit(1);  // automated updated failed, exception already handled
//			}
//		}
		
	}
	
	private Connection createDbConnetction() {
		try {
			// TODO read values from application.properties
			return DriverManager.getConnection("jdbc:h2:file:./target/MyLocalDB", "Salomon", "");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Unable to update DB");
			System.exit(0);
			return null;
		}
	}

	private String readTextFileToString(final File file)
	{
		final List<String> lines = readTextFile(file.getAbsolutePath());
		final StringBuffer sb = new StringBuffer();
		lines.forEach(l -> sb.append(l).append(System.getProperty("line.separator")));
		return sb.toString().trim();
	}
	
	private List<String> readTextFile(String pathAndfilename)
	{
		if (!new File(pathAndfilename).exists()) {
			throw new RuntimeException("Cannot read non-existing file '" + pathAndfilename + "'.");
		}

		final List<String> fileContent = new ArrayList<String>();

		try (Stream<String> stream = Files.lines(Paths.get(pathAndfilename.trim()))) {
			stream.forEach(line -> fileContent.add(line));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileContent;
	}
	
}
