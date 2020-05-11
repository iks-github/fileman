package com.iksgmbh.fileman.backend.dao;

import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.FileContentData;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FileContentDataDaoImpl extends FileContentDataDao
{
	public FileContentDataDaoImpl() {
		fileContentDatas.add(createDataset("readme.txt", "10.10.2000", "ich", 1234));
		fileContentDatas.add(createDataset("logo.gif", "11.10.2000", "du", 5555));
		fileContentDatas.add(createDataset("script.groovy", "12.10.2000", "er", 6543));
	}

	private FileContentData createDataset(
  			Long uuid,
  			String name,
  			String content,
  			String creator,
  			String creationDate)
	{
		FileContentData toReturn = new FileContentData();
		toReturn.setUuid(uuid);
		toReturn.setName(name);
		toReturn.setContent(content);
		toReturn.setCreator(creator);
		toReturn.setCreationDate(creationDate);
		return toReturn;
	}
}