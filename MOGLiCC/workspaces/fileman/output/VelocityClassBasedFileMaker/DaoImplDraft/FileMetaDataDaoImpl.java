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
		fileMetaDatas.add(createDataset("readme.txt", "10.10.2000", "ich", 1234));
		fileMetaDatas.add(createDataset("logo.gif", "11.10.2000", "du", 5555));
		fileMetaDatas.add(createDataset("script.groovy", "12.10.2000", "er", 6543));
	}

	private FileMetaData createDataset(
  			String name,
  			String description,
  			Long activeUUID,
  			Boolean immediatelyActive,
  			String type,
  			String creator,
  			String creationDate,
  			Integer size)
	{
		FileMetaData toReturn = new FileMetaData();
		toReturn.setName(name);
		toReturn.setDescription(description);
		toReturn.setActiveUUID(activeUUID);
		toReturn.setImmediatelyActive(immediatelyActive);
		toReturn.setType(type);
		toReturn.setCreator(creator);
		toReturn.setCreationDate(creationDate);
		toReturn.setSize(size);
		return toReturn;
	}
}