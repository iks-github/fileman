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