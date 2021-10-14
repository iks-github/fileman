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
import java.util.Arrays;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.FilemanBackend;
import com.iksgmbh.fileman.backend.FilemanConstants;
import com.iksgmbh.fileman.backend.LoginRequest;
import com.iksgmbh.fileman.backend.LoginResponse;
import com.iksgmbh.fileman.backend.Tenant;
import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.TenantDao;
import com.iksgmbh.fileman.backend.dao.UserDao;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginRestController {
	
	private static final String AUTH_FAIL_MESSAGE = "Wrong user ID, password, or tenant!";
	
	@Autowired
	private Environment env;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private TenantDao tenantDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Value("${jwt.secret}")
	private static String secret;

	@PostConstruct
	public void init() {
		System.setProperty("jwt.secret", env.getProperty("jwt.secret"));
	}
	
	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
		
		LoginResponse loginResponse = new LoginResponse();
		
		if (! loginRequest.getFilemanVersion().contentEquals(FilemanBackend.VERSION)) {
			loginResponse.setErrorMessage("Fileman version of client and server mismatch.");
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);		
		}
		
		final User user;
		
		if (isGuestUser(loginRequest.getUserId())) {
			loginRequest.setUserId(FilemanConstants.GUEST_USER_NAME);
			user = new User();
			user.setId(FilemanConstants.GUEST_USER_ID);
			user.setName(FilemanConstants.GUEST_USER_NAME);
			user.setRole(FilemanConstants.ROLE_READER);
			user.setPassword("");
			user.setTenants(Arrays.asList(tenantDao.findByName(FilemanConstants.DEFAULT_TENANT_NAME)));
		} else {
			try {
				user = userDao.findByName(loginRequest.getUserId());
			} catch (EmptyResultDataAccessException e) {
				loginResponse.setErrorMessage(AUTH_FAIL_MESSAGE);
				loginResponse.setOk(false);
				return ResponseEntity.ok(loginResponse);
			}
		}
		
		if (!(StringUtils.isEmpty(loginRequest.getUserPw()) && StringUtils.isEmpty(user.getPassword())) &&  
			  !passwordEncoder.matches(loginRequest.getUserPw(), user.getPassword())) {
			loginResponse.setErrorMessage(AUTH_FAIL_MESSAGE);
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);		
		}
		
		final String tenantNameFromLoginRequest =
				StringUtils.isEmpty(loginRequest.getTenant()) ? FilemanConstants.DEFAULT_TENANT_NAME : loginRequest.getTenant();
		
		Optional<Tenant> tenantOptional = user.getTenants()
				.stream()
				.filter(tenant -> 
					tenant.getName().equals(tenantNameFromLoginRequest)
				).findAny();
		
		if (!tenantOptional.isPresent()) {
			loginResponse.setErrorMessage(AUTH_FAIL_MESSAGE);
			loginResponse.setOk(false);
			return ResponseEntity.ok(loginResponse);
		}
		
		Tenant tenant = tenantOptional.get();

		final String token = JwtTokenUtil.generateToken(user, tenant.getId());

		loginResponse.setAuthToken(token);
		loginResponse.setOk(true);
		return ResponseEntity.ok(loginResponse);
	}
	
	private boolean isGuestUser(String username) {
		return StringUtils.isEmpty(username) || username.equals(FilemanConstants.GUEST_USER_NAME);
	}
}
