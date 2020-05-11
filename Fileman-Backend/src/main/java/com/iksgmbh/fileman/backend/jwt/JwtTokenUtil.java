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
package com.iksgmbh.fileman.backend.jwt;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import com.iksgmbh.fileman.backend.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = -8446552879773101373L;

	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

	private static String secret;

	//retrieve username from jwt token
	public static String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	//retrieve expiration date from jwt token
	public static Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public static <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	//generate token for user
	public static  String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", user.getRole());
		return doGenerateToken(claims, user.getName());
	}

	//while creating the token -
	//1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	//2. Sign the JWT using the HS512 algorithm and secret key.
	//3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//   compaction of the JWT to a URL-safe string 
	private static String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims)
				   .setSubject(subject)
				   .setIssuedAt(new Date(System.currentTimeMillis()))
				   .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				   .signWith(SignatureAlgorithm.HS512, getSecret())
				   .compact();
	}

	//validate token
	public Boolean validateToken(String token, User user) {
		final String username = getUsernameFromToken(token);
		return (username.equals(user.getName()) && !isTokenExpired(token));
	}

    //for retrieveing any information from token we will need the secret key
	private static Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	//check if the token has expired
	private static Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	private static String getSecret() {
		if (secret == null) {
			secret = System.getProperty("jwt.secret", "DefaultSecret_5");
		}
		return secret;
	}
}