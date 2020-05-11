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
package com.iksgmbh.fileman.backend.rest;

import java.util.Base64;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FileContentData;
import com.iksgmbh.fileman.backend.FileData;
import com.iksgmbh.fileman.backend.FileMetaData;
import com.iksgmbh.fileman.backend.dao.FavouriteSettingDaoImpl;
import com.iksgmbh.fileman.backend.dao.FileContentDataDaoImpl;
import com.iksgmbh.fileman.backend.dao.FileMetaDataDaoImpl;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = {"*"})
public class FileRestController
{
	@Autowired
	private FileMetaDataDaoImpl metaDataDao; 

	@Autowired
	private FileContentDataDaoImpl contentDataDao; 

	@Autowired
	private FavouriteSettingDaoImpl favouriteSettingDao; 

	@PostMapping("/files")
	public void createFileData(@Valid @RequestBody FileData fileData)
	{
		metaDataDao.create(fileData.getMetaData());
		contentDataDao.create(fileData.getContentData());
	}

	@PutMapping("/files/{fileName}")
	public void updateFileData(@PathVariable String fileName, @RequestBody FileData fileData)
	{
		FileMetaData toUpdate = metaDataDao.findByName(fileName);
		if (toUpdate == null) {
			throw new ResourceNotFoundException("File '" + fileName +"' + not found.");
		}
		if (fileData.getContentData() != null) {
			contentDataDao.create(fileData.getContentData());
		}
		toUpdate.merge(fileData.getMetaData());
		metaDataDao.update(toUpdate);
	}

	@GetMapping("/files/{fileName}")
	public byte[] getFileContent(@PathVariable String fileName)
	{
		List<FileContentData> data = contentDataDao.findAllForName(fileName);
		String toReturn = data.get(data.size()-1).getContent();
		return Base64.getDecoder().decode(toReturn);
		//String base64String = Base64.getEncoder().encodeToString("bytes".getBytes());
	}
	
	
	@DeleteMapping("/files/{fileName}")
	public void deleteFileData(@PathVariable String fileName) 
	{
		FileMetaData metaData = metaDataDao.findByName(fileName);
		metaDataDao.delete(metaData);
		
		contentDataDao.findAllForName(fileName)
		              .forEach(contentDataDao::delete);
		
		favouriteSettingDao.findAllForFilename(fileName)
                           .forEach(favouriteSettingDao::delete);
		
	}
}