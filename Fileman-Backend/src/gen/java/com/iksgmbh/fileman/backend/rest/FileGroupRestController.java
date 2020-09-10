package com.iksgmbh.fileman.backend.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.iksgmbh.fileman.backend.FileGroup;
import com.iksgmbh.fileman.backend.dao.FileGroupDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FileGroupRestController
{
	@Autowired
	private FileGroupDao fileGroupDao;

	@GetMapping("/fileGroups")
	public List<FileGroup> findAllFileGroups() {
		return fileGroupDao.findAllFileGroups();
	}

    @GetMapping("/fileGroups/{id}")
    public FileGroup findFileGroupById(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		FileGroup fileGroup = fileGroupDao.findById(id);
		if (fileGroup == null) {
			throw new ResourceNotFoundException("FileGroup '" + id +"' + not found.");
		}
		return fileGroup;
   }

	@PostMapping("/fileGroups")
	public Integer createFileGroup(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody FileGroup fileGroup) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return fileGroupDao.create(fileGroup).getId();
    }

	@PutMapping("/fileGroups")
	public void updateFileGroup(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody FileGroup fileGroup) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		boolean ok = fileGroupDao.update(fileGroup);
		if (! ok) {
			throw new ResourceNotFoundException("FileGroup '" + fileGroup.getId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/fileGroups/{id}")
	public ResponseEntity<?> deleteFileGroup(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		FileGroup fileGroup = fileGroupDao.findById(id);
		if (fileGroup == null) {
			throw new ResourceNotFoundException("FileGroup '" + id +"' + not found.");
		}
       fileGroupDao.delete(fileGroup);
       return ResponseEntity.ok().build();
	}
}