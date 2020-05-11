package com.iksgmbh.fileman.backend.dao;

import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.FileMetaData;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FileMetaDataDaoImpl extends FileMetaDataDao
{
	public FileMetaDataDaoImpl() {
		fileMetaDatas.add(createDataset("readme.txt", "Bla", true, "Text", "Pete", "10.10.2000", 123));
		fileMetaDatas.add(createDataset("logo.gif", "Logo", false, "Binary", "Pete", "10.10.2000", 9999));
		fileMetaDatas.add(createDataset("script.groovy", "do something", true, "Text", "Pete", "10.10.2000", 4321));
	}

	private FileMetaData createDataset(
  			String name,
  			String description,
  			boolean immediatelyActive,
  			String type,
  			String creator,
  			String creationDate,
  			int size)
	{
		FileMetaData toReturn = new FileMetaData();
		toReturn.setName(name);
		toReturn.setDescription(description);
		toReturn.setImmediatelyActive(immediatelyActive);
		toReturn.setType(type);
		toReturn.setCreator(creator);
		toReturn.setCreationDate(creationDate);
		toReturn.setSize(size);
		return toReturn;
	}
}