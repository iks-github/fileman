package com.iksgmbh.fileman.backend.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

       // with a real db this will be refactored
		user.setPasswordRepetition(null);  // set default value for non-db field

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

       // with a real db this will be refactored
		user.setPasswordRepetition(null);  // set default value for non-db field
		user.setId(users.size() + 1);

		users.add(user);
		return user;
	}

	public void delete(User user) {
		users.remove(user);
	}
}