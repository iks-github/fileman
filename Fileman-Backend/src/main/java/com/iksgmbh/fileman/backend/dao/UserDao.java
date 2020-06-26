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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.User;

/**
 * Created as draft by MOGLiCC.
 * Add new functionality manually if needed.
 *
**/
@Component
public class UserDao extends UserBasicDao {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public boolean update(User entity) {
		if (entity.getPassword() != null && entity.getPassword().length() > 0) {
			entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		}
		return super.update(entity);
	}
	
	@Override
	public User create(User entity) {
		if (entity.getPassword() != null && entity.getPassword().length() > 0) {
			entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		}
		return super.create(entity);
	}
}