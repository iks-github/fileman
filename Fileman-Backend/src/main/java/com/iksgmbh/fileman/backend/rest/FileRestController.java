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

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.iksgmbh.fileman.backend.dao.FavouriteSettingDao;
import com.iksgmbh.fileman.backend.dao.FileContentDataDao;
import com.iksgmbh.fileman.backend.dao.FileMetaDataDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FileRestController
{
	@Autowired
	private FileMetaDataDao metaDataDao; 

	@Autowired
	private FileContentDataDao contentDataDao; 

	@Autowired
	private FavouriteSettingDao favouriteSettingDao; 

	@PostMapping("/files")
	public void createFileData(@Valid @RequestBody FileData fileData) {
		fileData.getContentData().setCreationDate(new Date());
		FileContentData newContentVersion = contentDataDao.create(fileData.getContentData());
		if (fileData.getMetaData().getImmediatelyActive() != null && fileData.getMetaData().getImmediatelyActive()) {
			fileData.getMetaData().setActiveUUID(newContentVersion.getUuid());
		}
		fileData.getMetaData().setCreationDate(new Date());
		metaDataDao.create(fileData.getMetaData());
	}

	@PutMapping("/files/{fileName}")
	public void updateFileData(@PathVariable String fileName, @RequestBody FileData fileData)
	{
		FileMetaData toUpdate = metaDataDao.findByName(fileName);
		if (toUpdate == null) {
			throw new ResourceNotFoundException("File '" + fileName +"' + not found.");
		}

		boolean withContentChange = fileData.getContentData() != null;
		if (withContentChange) 
		{
			fileData.getContentData().setCreationDate(new Date());
			FileContentData newContentVersion = contentDataDao.create(fileData.getContentData());
			if (fileData.getMetaData().getImmediatelyActive() != null && fileData.getMetaData().getImmediatelyActive()) {
				fileData.getMetaData().setActiveUUID(newContentVersion.getUuid());
			}
		}
		toUpdate.merge(fileData.getMetaData());
		metaDataDao.update(toUpdate, withContentChange);
	}

	@GetMapping("/files/{fileName}")
	public ResponseEntity<byte[]> getFileContent(@PathVariable String fileName) throws SQLException
	{
		FileMetaData result = metaDataDao.findByName(fileName);
		if (result == null) return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
		FileContentData fileContentData = contentDataDao.findByUuid(result.getActiveUUID());
		return ResponseEntity.ok(fileContentData.getContent());
	}
	
	@GetMapping("/files/{fileName}/history")
	public List<FileContentData> getHistory(@PathVariable String fileName)
	{
		List<FileContentData> matches = contentDataDao.findAllForName(fileName);
		List<FileContentData> toReturn = new ArrayList<>();
		matches.forEach(fileContentData -> toReturn.add(0, (FileContentData) fileContentData.clone()));
		toReturn.forEach(fileContentData -> fileContentData.setContent(null));
		return toReturn;
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