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

	@GetMapping("/users/{name}")
    public User findUserByName(@PathVariable String name) {
		User user = userDao.findByName(name);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + name +"' + not found.");
		}
		return user;
   }

	@PostMapping("/users")
	public String createUser(@Valid @RequestBody User user)
	{
		return userDao.create(user).getName();
    }

	@PutMapping("/users")
	public void updateUser(@Valid @RequestBody User user)
	{
		boolean ok = userDao.update(user);
		if (! ok) {
			throw new ResourceNotFoundException("User '" + user.getName() +"' + not found for update.");
		}
	}

	@DeleteMapping("/users/{name}")
	public ResponseEntity<?> deleteUser(@PathVariable String name) {
		User user = userDao.findByName(name);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + name +"' + not found.");
		}
       userDao.delete(user);
       return ResponseEntity.ok().build();
	}
}