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
import com.iksgmbh.fileman.backend.User;

/**
 * Created as draft by MOGLiCC.
 * Adapt freely if you need.
 *
**/
@Component
public class UserDaoImpl extends UserDao
{
	public UserDaoImpl() {
		users.add(createDataset(1, "ich", "", "Reader"));
		users.add(createDataset(2, "Pete", "", "Writer"));
		users.add(createDataset(3, "Salomon", "", "Admin"));
	}

	private User createDataset(
  			Integer id,
  			String name,
  			String password,
  			String role)
	{
		User toReturn = new User();
		toReturn.setId(id);
		toReturn.setName(name);
		toReturn.setPassword(password);
		toReturn.setRole(role);
		return toReturn;
	}
}