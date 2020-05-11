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