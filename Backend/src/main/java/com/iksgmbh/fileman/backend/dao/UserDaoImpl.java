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