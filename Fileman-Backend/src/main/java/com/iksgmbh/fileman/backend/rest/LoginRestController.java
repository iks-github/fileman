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
import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FilemanBackend;
import com.iksgmbh.fileman.backend.LoginRequest;
import com.iksgmbh.fileman.backend.LoginResponse;
import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.UserDao;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = {"*"})
public class LoginRestController {
	
	private static final String AUTH_FAIL_MESSAGE = "User ID or password is wrong!";
	
	@Autowired
	private Environment env;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Value("${jwt.secret}")
	private static String secret;

	@PostConstruct
	public void init() {
		System.setProperty("jwt.secret", env.getProperty("jwt.secret"));
	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) throws Exception 
	{
		LoginResponse loginResponse = new LoginResponse();
		
		if (! loginRequest.getFilemanVersion().contentEquals(FilemanBackend.VERSION)) {
			loginResponse.setErrorMessage("Fileman version of client and server mismatch.");
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);		
		}
		
		User user = userDao.findByName(loginRequest.getUserId());
		if (user == null) {			
			loginResponse.setErrorMessage(AUTH_FAIL_MESSAGE);
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);		// ResourceNotFoundException ??
		}
		
		// temporary: allow login without password (only for predefined users)
		// TODO: remove later when predefined users also have passwords
		if (user.getPassword() == null) {
			user.setPassword("");
		}
		
		if (!(loginRequest.getUserPw().length() == 0 && user.getPassword().length() == 0) &&  
			  !passwordEncoder.matches(loginRequest.getUserPw(), user.getPassword())) {
			loginResponse.setErrorMessage(AUTH_FAIL_MESSAGE);
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);		
		}

		final String token = JwtTokenUtil.generateToken(user);

		loginResponse.setAuthToken(token);
		loginResponse.setOk(true);
		return ResponseEntity.ok(loginResponse);
	}
}