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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.UserDaoImpl;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = {"*"})
public class UserRestController
{
	@Autowired
	private UserDaoImpl userDao;

	@GetMapping("/users")
	public List<User> findAllUsers() {
		return userDao.findAllUsers();
	}

	@GetMapping("/users/{id}")
    public User findUserById(@PathVariable Integer id) {
		User user = userDao.findById(id);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + id +"' + not found.");
		}
		return user;
   }

	@GetMapping("/users/{name}")
    public User findUserByName(@PathVariable String name) {
		User user = userDao.findByName(name);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + name +"' + not found.");
		}
		return user;
   }

	@PostMapping("/users")
	public Integer createUser(@Valid @RequestBody User user)
	{
		return userDao.create(user).getId();
    }

	@PutMapping("/users")
	public void updateUser(@Valid @RequestBody User user)
	{
		boolean ok = userDao.update(user);
		if (! ok) {
			throw new ResourceNotFoundException("User '" + user.getId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
		User user = userDao.findById(id);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + id +"' + not found.");
		}
       userDao.delete(user);
       return ResponseEntity.ok().build();
	}
}