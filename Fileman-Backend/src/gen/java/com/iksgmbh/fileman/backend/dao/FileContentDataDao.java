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
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FileContentData;

@Component
public class FileContentDataDao
{
	protected List<FileContentData> fileContentDatas = new java.util.ArrayList<>();

	public List<FileContentData> findAllFileContentDatas() {
		return fileContentDatas;
	}

	public FileContentData findByUuid(Long uuid)
	{
	   	Optional<FileContentData> match = fileContentDatas.stream()
                .filter (data -> data.getUuid()
                .equals(uuid))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(FileContentData fileContentData)
	{
		Optional<FileContentData> match = fileContentDatas.stream()
                                                   .filter(o -> o.getUuid() == fileContentData.getUuid())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		fileContentDatas.remove(match.get());
		fileContentDatas.add(fileContentData);
		return true;
	}

	public List<FileContentData> findAllForName(String toSearch)
	{
		return fileContentDatas.stream()
                .filter (dataset -> dataset.getName().equals(toSearch))
                .collect(Collectors.toList());
	}

	public FileContentData create(FileContentData fileContentData) {
		fileContentDatas.add(fileContentData);
		return fileContentData;
	}

	public void delete(FileContentData fileContentData) {
		fileContentDatas.remove(fileContentData);
	}
}