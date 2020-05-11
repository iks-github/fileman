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

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileMetaData;

@Component
public class FileMetaDataDao
{
	protected List<FileMetaData> fileMetaDatas = new java.util.ArrayList<>();

	public List<FileMetaData> findAllFileMetaDatas() {
		return fileMetaDatas;
	}

	public FileMetaData findByName(String name)
	{
	   	Optional<FileMetaData> match = fileMetaDatas.stream()
                .filter (data -> data.getName()
                .equals(name))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(FileMetaData fileMetaData)
	{
		Optional<FileMetaData> match = fileMetaDatas.stream()
                                                   .filter(o -> o.getName() == fileMetaData.getName())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		fileMetaDatas.remove(match.get());
		fileMetaDatas.add(fileMetaData);
		return true;
	}

	public FileMetaData create(FileMetaData fileMetaData) {
		fileMetaDatas.add(fileMetaData);
		return fileMetaData;
	}

	public void delete(FileMetaData fileMetaData) {
		fileMetaDatas.remove(fileMetaData);
	}
}