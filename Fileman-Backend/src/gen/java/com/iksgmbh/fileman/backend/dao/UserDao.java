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

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.User;

@Component
public class UserDao
{
	protected List<User> users = new java.util.ArrayList<>();

	public List<User> findAllUsers() {
		return users;
	}

	public User findById(Integer id)
	{
	   	Optional<User> match = users.stream()
                .filter (data -> data.getId()
                .equals(id))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public boolean update(User user)
	{
		Optional<User> match = users.stream()
                                                   .filter(o -> o.getId() == user.getId())
                                                   .findFirst();
		if (! match.isPresent()) {
			return false;
		}

		users.remove(match.get());
		users.add(user);
		return true;
	}

	public User findByName(String name)
	{
	   	Optional<User> match = users.stream()
                .filter (data -> data.getName()
                .equals(name))
                .findFirst();
		if (match.isPresent()) {
			return match.get();
		}
		return null;
	}

	public User create(User user) {
		users.add(user);
		return user;
	}

	public void delete(User user) {
		users.remove(user);
	}
}