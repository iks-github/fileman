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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FileMetaData;
import com.iksgmbh.fileman.backend.dao.FileMetaDataDaoImpl;

@RestController
@CrossOrigin(origins = {"*"})
public class MetaDataRestController
{
	@Autowired
	private FileMetaDataDaoImpl metaDataDao; 

	@GetMapping("/fileMetaDatas")
	public List<FileMetaData> findAllFileMetaDatas() {
		return metaDataDao.findAllFileMetaDatas();
	}	

	@GetMapping("/fileMetaDatas/{filename}/exist")
	public boolean findAllFileMetaDatas(@PathVariable String fileName) {
		return metaDataDao.findByName(fileName) != null;
	}	
	
}