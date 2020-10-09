package de.iksgmbh.dbschemacomp.helper;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class FileUtil 
{
	public static String readTextFile(String pathToFile) 
	{
		StringBuffer toReturn = new StringBuffer();
		try {
			List<String> lines = Files.readAllLines(Paths.get(pathToFile), StandardCharsets.UTF_8);
			lines.forEach(line -> toReturn.append(line).append(System.getProperty("line.separator")));
		} catch (IOException ex) {
			System.out.format("I/O Exception", ex);
		}		
		return toReturn.toString().trim();
	}

	public static void writeTextFile(String pathToFile, String content) 
	{
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(pathToFile));
			writer.write(content);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}
}
