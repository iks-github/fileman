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

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FileMetaData;
import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.FileMetaDataDao;
import com.iksgmbh.fileman.backend.dao.UserDao;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MetaDataRestController
{
	@Autowired
	private FileMetaDataDao metaDataDao;

	@Autowired
	private UserDao userDao;

	@GetMapping("/fileMetaDatas")
	public List<FileMetaData> findAllFileMetaDatas(@RequestHeader("Authorization") String authHeader) {
		
		String token = JwtTokenUtil.extractTokenFromAuthHeader(authHeader);
		Integer userId = JwtTokenUtil.getUserIDFromToken(token);
		User user = userDao.findById(userId);
		
		return metaDataDao.findAllForTenant(user.getTenant());
	}

	@PutMapping("/fileMetaDatas/{filename}/uuid/{uuid}")
	public ResponseEntity<?> setActive(@PathVariable String filename, 
			                           @PathVariable Long uuid) 
	{
		FileMetaData metaData = metaDataDao.findByName(filename);
		metaData.setActiveUUID(uuid);
		metaDataDao.update(metaData);
		return ResponseEntity.ok().build();
	}	
	
}