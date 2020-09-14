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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FileContentData;
import com.iksgmbh.fileman.backend.FileData;
import com.iksgmbh.fileman.backend.FileMetaData;
import com.iksgmbh.fileman.backend.Tenant;
import com.iksgmbh.fileman.backend.dao.FavouriteSettingDao;
import com.iksgmbh.fileman.backend.dao.FileContentDataDao;
import com.iksgmbh.fileman.backend.dao.FileMetaDataDao;
import com.iksgmbh.fileman.backend.dao.TenantDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FileRestController {

	@Autowired
	private FileMetaDataDao metaDataDao;

	@Autowired
	private FileContentDataDao contentDataDao;

	@Autowired
	private FavouriteSettingDao favouriteSettingDao;

	@Autowired
	private TenantDao tenantDao;

	@PostMapping("/files")
	public void createFileData(@RequestHeader("Authorization") String authHeader,
			@Valid @RequestBody FileData fileData) {
		
    	String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
    	Integer tenantId = JwtTokenUtil.getTenantIdFromToken(token);
    	Tenant tenant = tenantDao.findById(tenantId);
    	
		fileData.getContentData().setCreationDate(new Date());
		fileData.getContentData().setTenant(tenant);
		FileContentData newContentVersion = contentDataDao.create(fileData.getContentData());
		if (fileData.getMetaData().getImmediatelyActive() != null && fileData.getMetaData().getImmediatelyActive()) {
			fileData.getMetaData().setActiveUUID(newContentVersion.getUuid());
			fileData.getMetaData().setTenant(tenant);
		}
		fileData.getMetaData().setCreationDate(new Date());
		metaDataDao.create(fileData.getMetaData());
	}

	@PutMapping("/files/{fileName}")
	public void updateFileData(@RequestHeader("Authorization") String authHeader,
			@PathVariable String fileName, @RequestBody FileData fileData) {
        
    	String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
    	Integer tenantId = JwtTokenUtil.getTenantIdFromToken(token);
    	Tenant tenant = tenantDao.findById(tenantId);
    	
		FileMetaData toUpdate = metaDataDao.findByNameAndTenant(fileName, tenant);
		if (toUpdate == null) {
			throw new ResourceNotFoundException("File '" + fileName +"' + not found.");
		}

		boolean withContentChange = fileData.getContentData() != null;
		if (withContentChange) 
		{
			fileData.getContentData().setCreationDate(new Date());
			fileData.getContentData().setTenant(tenant);
			FileContentData newContentVersion = contentDataDao.create(fileData.getContentData());
			if (fileData.getMetaData().getImmediatelyActive() != null && fileData.getMetaData().getImmediatelyActive()) {
				fileData.getMetaData().setActiveUUID(newContentVersion.getUuid());
			}
		}
		toUpdate.merge(fileData.getMetaData());
		metaDataDao.update(toUpdate, withContentChange);
	}

	@GetMapping("/files/{fileName}")
	public ResponseEntity<byte[]> getFileContent(@RequestHeader("Authorization") String authHeader,
			@PathVariable String fileName) throws SQLException {
        
    	String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
    	Integer tenantId = JwtTokenUtil.getTenantIdFromToken(token);
    	Tenant tenant = tenantDao.findById(tenantId);
    	
		FileMetaData result = metaDataDao.findByNameAndTenant(fileName, tenant);
		if (result == null) return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
		FileContentData fileContentData = contentDataDao.findByUuid(result.getActiveUUID());
		return ResponseEntity.ok(fileContentData.getContent());
	}

	@GetMapping("/files/{fileName}/history")
	public List<FileContentData> getHistory(@RequestHeader("Authorization") String authHeader,
			@PathVariable String fileName) {
        
    	String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
    	Integer tenantId = JwtTokenUtil.getTenantIdFromToken(token);
    	Tenant tenant = tenantDao.findById(tenantId);
    	
		List<FileContentData> matches = contentDataDao.findAllForNameAndTenant(fileName, tenant);
		List<FileContentData> toReturn = new ArrayList<>();
		matches.forEach(fileContentData -> toReturn.add(0, (FileContentData) fileContentData.clone()));
		toReturn.forEach(fileContentData -> fileContentData.setContent(null));
		return toReturn;
	}

	@DeleteMapping("/files/{fileName}")
	public void deleteFileData(@RequestHeader("Authorization") String authHeader,
			@PathVariable String fileName) {
        
    	String token = JwtTokenUtil.validateTokenFromAuthHeader(authHeader);
    	Integer tenantId = JwtTokenUtil.getTenantIdFromToken(token);
    	Tenant tenant = tenantDao.findById(tenantId);
    	
		FileMetaData metaData = metaDataDao.findByNameAndTenant(fileName, tenant);
		metaDataDao.delete(metaData);
		
		contentDataDao.findAllForNameAndTenant(fileName, tenant)
		              .forEach(contentDataDao::delete);
		
		favouriteSettingDao.findAllForFilenameAndTenant(fileName, tenant)
                           .forEach(favouriteSettingDao::delete);
	}
}
