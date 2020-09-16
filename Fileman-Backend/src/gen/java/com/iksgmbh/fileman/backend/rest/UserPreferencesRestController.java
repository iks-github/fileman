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

import com.iksgmbh.fileman.backend.UserPreferences;
import com.iksgmbh.fileman.backend.dao.UserPreferencesDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserPreferencesRestController
{
	@Autowired
	private UserPreferencesDao userPreferencesDao;

	@GetMapping("/userPreferencess")
	public List<UserPreferences> findAllUserPreferencess(@RequestHeader("Authorization") String authHeader) {
		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return userPreferencesDao.findAllUserPreferencess();
	}

    @GetMapping("/userPreferencess/{userId}")
    public UserPreferences findUserPreferencesByUserId(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer userId) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		UserPreferences userPreferences = userPreferencesDao.findByUserId(userId);
		if (userPreferences == null) {
			throw new ResourceNotFoundException("UserPreferences '" + userId +"' + not found.");
		}
		return userPreferences;
   }

	@PostMapping("/userPreferencess")
	public Integer createUserPreferences(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UserPreferences userPreferences) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return userPreferencesDao.create(userPreferences).getUserId();
    }

	@PutMapping("/userPreferencess")
	public void updateUserPreferences(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UserPreferences userPreferences) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		boolean ok = userPreferencesDao.update(userPreferences);
		if (! ok) {
			throw new ResourceNotFoundException("UserPreferences '" + userPreferences.getUserId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/userPreferencess/{userId}")
	public ResponseEntity<?> deleteUserPreferences(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer userId) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		UserPreferences userPreferences = userPreferencesDao.findByUserId(userId);
		if (userPreferences == null) {
			throw new ResourceNotFoundException("UserPreferences '" + userId +"' + not found.");
		}
		userPreferencesDao.delete(userPreferences);
		return ResponseEntity.ok().build();
	}
}