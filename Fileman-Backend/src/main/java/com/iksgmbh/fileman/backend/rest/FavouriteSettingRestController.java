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

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FavouriteSetting;
import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.FavouriteSettingDao;
import com.iksgmbh.fileman.backend.dao.UserDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FavouriteSettingRestController
{
    @Autowired
    private FavouriteSettingDao favouriteSettingDao;
    
	@Autowired
	private UserDao userDao;

    @GetMapping("/favouriteSettings/username/{username}")
    public List<FavouriteSetting> findAllFavouriteSettingByUsername(@PathVariable String username) {
        List<FavouriteSetting> favouriteSettingList = favouriteSettingDao.findAllForUsername(username);
        if (favouriteSettingList == null) {
            throw new ResourceNotFoundException("FavouriteSetting '" + username +"' + not found.");
        }
        return favouriteSettingList;
   }

    @GetMapping("/favouriteSettings/filename/{filename}")
    public List<FavouriteSetting> findAllFavouriteSettingByFilename(@RequestHeader("Authorization") String authHeader,
    		@PathVariable String filename) {
        
		String token = JwtTokenUtil.extractTokenFromAuthHeader(authHeader);
		Integer userId = JwtTokenUtil.getUserIDFromToken(token);
		User user = userDao.findById(userId);
    	
    	List<FavouriteSetting> favouriteSettingList = favouriteSettingDao.findAllForFilenameAndTenant(filename, user.getTenant());
        if (favouriteSettingList == null) {
            throw new ResourceNotFoundException("FavouriteSetting '" + filename +"' + not found.");
        }
        return favouriteSettingList;
    }

	@PostMapping("/favouriteSettings")
	public Integer createFavouriteSetting(@RequestHeader("Authorization") String authHeader,
			@Valid @RequestBody FavouriteSetting favouriteSetting) {
		
		String token = JwtTokenUtil.extractTokenFromAuthHeader(authHeader);
		Integer userId = JwtTokenUtil.getUserIDFromToken(token);
		User user = userDao.findById(userId);
		
		favouriteSetting.setTenant(user.getTenant());
		
		return favouriteSettingDao.create(favouriteSetting).getId();
    }

	@DeleteMapping("/favouriteSettings/{id}")
	public ResponseEntity<?> deleteFavouriteSetting(@PathVariable Integer id) {
		FavouriteSetting favouriteSetting = favouriteSettingDao.findById(id);
		if (favouriteSetting == null) {
			throw new ResourceNotFoundException("FavouriteSetting '" + id +"' + not found.");
		}
		favouriteSettingDao.delete(favouriteSetting);
		return ResponseEntity.ok().build();
	}
}