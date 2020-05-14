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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.UserAuthData;
import com.iksgmbh.fileman.backend.UserCredentials;
import com.iksgmbh.fileman.backend.dao.UserDaoImpl;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@SuppressWarnings("deprecation")
@RestController
@CrossOrigin(origins = {"*"})
public class AuthRestController {
	
	private PasswordEncoder passwordEncoder = NoOpPasswordEncoder.getInstance();
	
	@Autowired
	private Environment env;
	
	@Autowired
	private UserDaoImpl userDao;
	
	@Value("${jwt.secret}")
	private static String secret;

	@PostConstruct
	public void init() {
		System.setProperty("jwt.secret", env.getProperty("jwt.secret"));
	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody UserCredentials credentials) throws Exception {
		if (credentials == null || credentials.getUserId() == null) {
			UserAuthData userAuthData = new UserAuthData();
			userAuthData.setOk(false);
			return ResponseEntity.ok(userAuthData);		
		}
		
		User user;
		try {
			user = userDao.findByName(credentials.getUserId());
			
		} catch (ResourceNotFoundException e) {
			UserAuthData userAuthData = new UserAuthData();
			userAuthData.setOk(false);
			return ResponseEntity.ok(userAuthData);		
		}
		
		if (!passwordEncoder.matches(credentials.getUserPw(), user.getPassword())) {
			UserAuthData userAuthData = new UserAuthData();
			userAuthData.setOk(false);
			return ResponseEntity.ok(userAuthData);		
		}

		final String token = JwtTokenUtil.generateToken(user);

		UserAuthData userAuthData = new UserAuthData();
		userAuthData.setAuthToken(token);
		userAuthData.setOk(true);
		return ResponseEntity.ok(userAuthData);
	}
}