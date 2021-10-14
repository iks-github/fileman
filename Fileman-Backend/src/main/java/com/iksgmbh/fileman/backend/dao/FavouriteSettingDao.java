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

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.FavouriteSetting;
import com.iksgmbh.fileman.backend.FilemanConstants;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class FavouriteSettingDao extends FavouriteSettingBasicDao {
	
	private static final int DUMMY_ID = -1;
	
	@Override
	public FavouriteSetting findById(Integer id) {
		if (id == DUMMY_ID) {
			return getDummyObject(FilemanConstants.GUEST_USER_NAME);
		}
		return entityManager.find(FavouriteSetting.class, id);
	}
	
	@Override
	public boolean update(FavouriteSetting entity) {
		if (entity.getUsername().equals(FilemanConstants.GUEST_USER_NAME)) {
			return true;
		}
		return super.update(entity);
	}
	
	@Override
	public FavouriteSetting create(FavouriteSetting entity) {
		if (entity.getUsername().equals(FilemanConstants.GUEST_USER_NAME)) {
			return getDummyObject(FilemanConstants.GUEST_USER_NAME);
		}
		return super.create(entity);
	}
	
	@Override
	public void delete(FavouriteSetting entity) {
		if (!entity.getUsername().equals(FilemanConstants.GUEST_USER_NAME)) {
			super.delete(entity);
		}
	}
	
	private FavouriteSetting getDummyObject(String username) {
		FavouriteSetting dummy = new FavouriteSetting();
		dummy.setId(DUMMY_ID);
		dummy.setUsername(username);
		dummy.setFilename(null);
		dummy.setTenant(null);
		return dummy;
	}
}
