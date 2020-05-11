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