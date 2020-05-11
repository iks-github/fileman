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
		users.add(createDataset("readme.txt", "10.10.2000", "ich", 1234));
		users.add(createDataset("logo.gif", "11.10.2000", "du", 5555));
		users.add(createDataset("script.groovy", "12.10.2000", "er", 6543));
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