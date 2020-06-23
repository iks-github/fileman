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

import com.iksgmbh.fileman.backend.UserComponentState;
import com.iksgmbh.fileman.backend.dao.UserComponentStateDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = {"*"})
public class UserComponentStateRestController
{
	@Autowired
	private UserComponentStateDao userComponentStateDao;

	@GetMapping("/userComponentStates")
	public List<UserComponentState> findAllUserComponentStates() {
		return userComponentStateDao.findAllUserComponentStates();
	}

	@GetMapping("/userComponentStates/{userId}")
    public UserComponentState findUserComponentStateByUserId(@PathVariable Integer userId) {
		UserComponentState userComponentState = userComponentStateDao.findByUserId(userId);
		if (userComponentState == null) {
			throw new ResourceNotFoundException("UserComponentState '" + userId +"' + not found.");
		}
		return userComponentState;
   }

	@PostMapping("/userComponentStates")
	public Integer createUserComponentState(@Valid @RequestBody UserComponentState userComponentState)
	{
		return userComponentStateDao.create(userComponentState).getUserId();
    }

	@PutMapping("/userComponentStates")
	public void updateUserComponentState(@Valid @RequestBody UserComponentState userComponentState)
	{
		boolean ok = userComponentStateDao.update(userComponentState);
		if (! ok) {
			throw new ResourceNotFoundException("UserComponentState '" + userComponentState.getUserId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/userComponentStates/{userId}")
	public ResponseEntity<?> deleteUserComponentState(@PathVariable Integer userId) {
		UserComponentState userComponentState = userComponentStateDao.findByUserId(userId);
		if (userComponentState == null) {
			throw new ResourceNotFoundException("UserComponentState '" + userId +"' + not found.");
		}
       userComponentStateDao.delete(userComponentState);
       return ResponseEntity.ok().build();
	}
}