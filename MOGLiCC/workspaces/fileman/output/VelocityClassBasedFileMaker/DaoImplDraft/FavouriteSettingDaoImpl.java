package com.iksgmbh.fileman.backend.dao;

import org.springframework.stereotype.Component;
import com.iksgmbh.fileman.backend.FavouriteSetting;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FavouriteSettingDaoImpl extends FavouriteSettingDao
{
	public FavouriteSettingDaoImpl() {
		favouriteSettings.add(createDataset("readme.txt", "10.10.2000", "ich", 1234));
		favouriteSettings.add(createDataset("logo.gif", "11.10.2000", "du", 5555));
		favouriteSettings.add(createDataset("script.groovy", "12.10.2000", "er", 6543));
	}

	private FavouriteSetting createDataset(
  			Integer id,
  			String username,
  			String filename)
	{
		FavouriteSetting toReturn = new FavouriteSetting();
		toReturn.setId(id);
		toReturn.setUsername(username);
		toReturn.setFilename(filename);
		return toReturn;
	}
}