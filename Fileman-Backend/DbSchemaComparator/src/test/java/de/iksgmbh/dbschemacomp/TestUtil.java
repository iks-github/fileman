package de.iksgmbh.dbschemacomp;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class TestUtil 
{
	public static String readSchema(String filename) 
	{
	       StringBuilder contentBuilder = new StringBuilder();
	       
	        try (Stream<String> stream = Files.lines( Paths.get(filename), StandardCharsets.UTF_8)) 
	        {
	            stream.forEach(s -> contentBuilder.append(s).append("\n"));
	        }
	        catch (IOException e) 
	        {
	            e.printStackTrace();
	        }
	 
	        return contentBuilder.toString();
	}
		

}
