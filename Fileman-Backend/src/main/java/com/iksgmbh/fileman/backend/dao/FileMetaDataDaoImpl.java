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
		fileMetaDatas.add(createDataset("readme.txt", "Bla", 1L, "txt", 1, "Pete", "10.10.2000", 123));
		fileMetaDatas.add(createDataset("logo.jpg", "Logo", 2L, "jpg", 1, "Pete", "10.10.2000", 9999));
		fileMetaDatas.add(createDataset("script.groovy", "do something", 3L, "groovy", 1, "Pete", "10.10.2000", 4321));
	}
	
	private FileMetaData createDataset(
  			String name,
  			String description,
  			Long activeUUID,
  			String type,
  			Integer version,
  			String creator,
  			String creationDate,
  			Integer size)
	{
		FileMetaData toReturn = new FileMetaData();
		toReturn.setName(name);
		toReturn.setDescription(description);
		toReturn.setActiveUUID(activeUUID);
		toReturn.setImmediatelyActive(true);
		toReturn.setTechType(type);
		toReturn.setTechVersion(version);
		toReturn.setCreator(creator);
		toReturn.setCreationDate(creationDate);
		toReturn.setSize(size);
		return toReturn;
	}

	@Override
	public FileMetaData create(FileMetaData fileMetaData) 
	{
		setTechType(fileMetaData);
		fileMetaData.setTechVersion(1);
		return super.create(fileMetaData);
	}

	public boolean update(FileMetaData fileMetaData, boolean withContentChange) 
	{
		if (withContentChange) {			
			fileMetaData.setTechVersion(fileMetaData.getTechVersion()+1);
		}
		return super.update(fileMetaData);
	}

	private void setTechType(FileMetaData fileMetaData) 
	{
		String name = fileMetaData.getName();
		if (name.contains(".")) {
			int pos = name.lastIndexOf(".") + 1;
			String fileExtension = name.substring(pos);
			fileMetaData.setTechType(fileExtension);
		}
		
	}
	
}