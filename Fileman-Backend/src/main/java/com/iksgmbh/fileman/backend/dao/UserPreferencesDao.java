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

import com.iksgmbh.fileman.backend.FilemanConstants;
import com.iksgmbh.fileman.backend.UserPreferences;

/**
 * Created as draft by MOGLiCC.
 * Add new functionality manually if needed.
 *
**/
@Component
public class UserPreferencesDao extends UserPreferencesBasicDao{
	
	@Override
	public UserPreferences findByUserId(Integer userId) {
		
		UserPreferences userPreferences = super.findByUserId(userId);
		
		// return dummy object if user is guest or component state is not yet present
		if (userId == FilemanConstants.GUEST_USER_ID || userPreferences == null) {
			return getDummyObject(userId);
		}
		
		return userPreferences;
	}
	
	@Override
	public boolean update(UserPreferences entity) {
		if (entity.getUserId() == FilemanConstants.GUEST_USER_ID) {
			return true;
		}
		return super.update(entity);
	}
	
	@Override
	public UserPreferences create(UserPreferences entity) {
		if (entity.getUserId() == FilemanConstants.GUEST_USER_ID) {
			return getDummyObject(FilemanConstants.GUEST_USER_ID);
		}
		return super.create(entity);
	}
	
	@Override
	public void delete(UserPreferences entity) {
		if (entity.getUserId() != FilemanConstants.GUEST_USER_ID) {
			super.delete(entity);
		}
	}
	
	private UserPreferences getDummyObject(Integer userId) {
		UserPreferences dummy = new UserPreferences();
		dummy.setUserId(userId);
		dummy.setContentType(null);
		dummy.setLayoutType(null);
		dummy.setFavouriteFilterActive(false);
		return dummy;
	}
}
