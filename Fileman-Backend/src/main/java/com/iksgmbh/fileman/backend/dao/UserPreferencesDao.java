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
		
		// return dummy object if component state is not yet present
		if (userPreferences == null) {
			UserPreferences dummy = new UserPreferences();
			dummy.setUserId(userId);
			dummy.setContentType(null);
			dummy.setLayoutType(null);
			dummy.setFavouriteFilterActive(false);
			userPreferences = dummy;
		}
		
		return userPreferences;
	}
}
