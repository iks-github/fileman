/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.iksgmbh.fileman.backend.helper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
* Release Helper: Replaces all version strings in frontend and backend files.
*/
public class VersionReplacer
{
	private static final String VERSION_TO_SET = "1.0.0";

	private static final String PATH_TO_POM_FILE = "../Fileman-Backend/pom.xml";
	private static final String PATH_TO_JAVA_FILE = "../Fileman-Backend/src/main/java/com/iksgmbh/fileman/backend/FilemanBackend.java";
	private static final String PATH_TO_TS_FILE = "../Fileman-Frontend/src/app/common/fileman-constants.ts";
    private static final String MAVEN_VERSION_SECTION_START = "    <version>";
    private static final String MAVEN_VERSION_SECTION_END = "</version>";
	private static final String JAVA_VERSION_CONSTANT = "	public static final String VERSION = ";
	private static final String TS_VERSION_CONSTANT = "  static VERSION = ";
    public static void main(String[] args)
    {
    	VersionReplacer versionReplacer = new VersionReplacer();
    	try {
			versionReplacer.doYourJob();
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

    public void doYourJob() throws IOException
    {
      final VersionReplacer versionReplacer = new VersionReplacer();

      System.out.println("");
      System.out.println("VersionReplacer:");
      System.out.println("-----------------------------------------------------------------------------------------------");
      System.out.println("Setting version  " + VERSION_TO_SET + "  to:");
      System.out.println("");

      File pomFile = new File(PATH_TO_POM_FILE);
      System.out.println(pomFile.getCanonicalPath() + "..."); 
      versionReplacer.replaceVersionInPomFile(pomFile, VERSION_TO_SET);
	  
      File javaFile = new File(PATH_TO_JAVA_FILE);
      System.out.println(javaFile.getCanonicalPath() + "..."); 
      versionReplacer.replaceVersionInJavaFile(javaFile, VERSION_TO_SET);
      
      File tsFile = new File(PATH_TO_TS_FILE);
      System.out.println(tsFile.getCanonicalPath() + "..."); 
      versionReplacer.replaceVersionInTsFile(tsFile, VERSION_TO_SET);
      
      System.out.println("");
      System.out.println("Done.");
      System.out.println("-----------------------------------------------------------------------------------------------");
      System.out.println("");
   }

    private List<String> readFileContent(final File file) throws IOException
    {
      final List<String> fileContent = new ArrayList<String>();
        final FileInputStream fis = new FileInputStream(file);
        final BufferedReader br = new BufferedReader(new InputStreamReader(fis));

        String line = null;
        while ((line = br.readLine()) != null) {
            fileContent.add(line);
        }

        br.close();
      return fileContent;
   }

	private void replaceVersionInTsFile(final File tsFile, final String versionToSet) 
	{
		final List<String> fileContent;

		try {
			fileContent = readFileContent(tsFile);
		} catch (Exception e) {
			throw new RuntimeException("Not found: " + tsFile.getAbsolutePath(), e);
		}

		final List<String> newContent = new ArrayList<String>();
		for (String line : fileContent) {
			if (line.startsWith(TS_VERSION_CONSTANT)) {
				newContent.add(TS_VERSION_CONSTANT + "'" + versionToSet + "';");
			} else {
				newContent.add(line);
			}
		}
		
		try {
			//fileContent.forEach(System.out::println); 
			createNewFileWithContent(tsFile, newContent);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
 
	private void replaceVersionInJavaFile(final File javaFile, final String versionToSet) 
	{
		final List<String> fileContent;

		try {
			fileContent = readFileContent(javaFile);
		} catch (Exception e) {
			throw new RuntimeException("Not found: " + javaFile.getAbsolutePath(), e);
		}

		final List<String> newContent = new ArrayList<String>();
		for (String line : fileContent) {
			if (line.startsWith(JAVA_VERSION_CONSTANT)) {
				newContent.add(JAVA_VERSION_CONSTANT + "\"" + versionToSet + "\";");
			} else {
				newContent.add(line);
			}
		}
		
		try {
			//fileContent.forEach(System.out::println); 
			createNewFileWithContent(javaFile, newContent);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
 
    private void replaceVersionInPomFile(final File pomFile,
                                         final String versionToSet)
    {
        final List<String> fileContent;

        try {
            fileContent = readFileContent(pomFile);
        } catch (Exception e) {
            throw new RuntimeException("Not found: " + pomFile.getAbsolutePath(), e);
        }

		final List<String> newContent = new ArrayList<String>();
		boolean firstOccurrence = true;
		for (String line : fileContent) {
			if (firstOccurrence && line.startsWith(MAVEN_VERSION_SECTION_START)) {
				newContent.add(MAVEN_VERSION_SECTION_START + versionToSet + MAVEN_VERSION_SECTION_END);
				firstOccurrence = false;
			} else {
				newContent.add(line);
			}
		}
		
		try {
			//fileContent.forEach(System.out::println); 
			createNewFileWithContent(pomFile, newContent);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

    private void createNewFileWithContent(final File file,
                                          final List<String> fileContent) throws IOException
    {
        final BufferedWriter writer = new BufferedWriter(new FileWriter(file));

        for (String line : fileContent) {
            writer.write(line);
            writer.write(System.getProperty("line.separator"));
        }
        writer.close();
    }

}
