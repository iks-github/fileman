package com.iksgmbh.fileman.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FavouriteSetting;

@Component
public class FavouriteSettingDao
{
	protected List<FavouriteSetting> favouriteSettings = new java.util.ArrayList<>();

	public List<FavouriteSetting> findAllFavouriteSettings() {
		return favouriteSettings;
	}

	public FavouriteSetting findById(Integer id)
	{
	   	Optional<FavouriteSetting> match = favouriteSettings.stream()
                .filter (data -> data.getId()
                .equals(id))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(FavouriteSetting favouriteSetting)
	{
		Optional<FavouriteSetting> match = favouriteSettings.stream()
                                                   .filter(o -> o.getId() == favouriteSetting.getId())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		favouriteSettings.remove(match.get());
		favouriteSettings.add(favouriteSetting);
		return true;
	}

	public List<FavouriteSetting> findAllForUsername(String toSearch)
	{
		return favouriteSettings.stream()
                .filter (dataset -> dataset.getUsername().equals(toSearch))
                .collect(Collectors.toList());
	}

	public List<FavouriteSetting> findAllForFilename(String toSearch)
	{
		return favouriteSettings.stream()
                .filter (dataset -> dataset.getFilename().equals(toSearch))
                .collect(Collectors.toList());
	}

	public FavouriteSetting create(FavouriteSetting favouriteSetting) {
		favouriteSettings.add(favouriteSetting);
		return favouriteSetting;
	}

	public void delete(FavouriteSetting favouriteSetting) {
		favouriteSettings.remove(favouriteSetting);
	}
}