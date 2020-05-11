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
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FavouriteSetting;
import com.iksgmbh.fileman.backend.dao.FavouriteSettingDaoImpl;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = {"*"})
public class FavouriteSettingRestController
{
	@Autowired
	private FavouriteSettingDaoImpl favouriteSettingDao;

   @GetMapping("/favouriteSettings/username/{username}")
   public List<FavouriteSetting> findAllFavouriteSettingByUsername(@PathVariable String username) {
		List<FavouriteSetting> favouriteSettingList = favouriteSettingDao.findAllForUsername(username);
		if (favouriteSettingList == null) {
			throw new ResourceNotFoundException("FavouriteSetting '" + username +"' + not found.");
		}
       return favouriteSettingList;
   }

   @GetMapping("/favouriteSettings/filename/{filename}")
   public List<FavouriteSetting> findAllFavouriteSettingByFilename(@PathVariable String filename) {
		List<FavouriteSetting> favouriteSettingList = favouriteSettingDao.findAllForFilename(filename);
		if (favouriteSettingList == null) {
			throw new ResourceNotFoundException("FavouriteSetting '" + filename +"' + not found.");
		}
       return favouriteSettingList;
   }

	@PostMapping("/favouriteSettings")
	public Integer createFavouriteSetting(@Valid @RequestBody FavouriteSetting favouriteSetting) {
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