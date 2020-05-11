package com.iksgmbh.fileman.backend.dao;

import java.util.Base64;

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
		fileContentDatas.add(createDataset(11L, "readme.txt", toBase64String("bla"), "ich", "12.10.2000"));
		fileContentDatas.add(createDataset(22L, "logo.gif", "10101", "du", "12.10.2000"));
		fileContentDatas.add(createDataset(33L, "script.groovy", toBase64String("exec"), "er", "12.10.2000"));
	}
	
	private String toBase64String(String s) {
		return Base64.getEncoder().encodeToString(s.getBytes());
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