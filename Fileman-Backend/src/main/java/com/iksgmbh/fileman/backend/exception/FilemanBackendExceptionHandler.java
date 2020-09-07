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
package com.iksgmbh.fileman.backend.exception;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.iksgmbh.fileman.backend.ExceptionMetaData;

@ControllerAdvice
@RestController
public class FilemanBackendExceptionHandler extends ResponseEntityExceptionHandler 
{
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleFilemanException(Exception ex, 
			                                             WebRequest request) 
	{
		ExceptionMetaData exceptionMetaData = new ExceptionMetaData();
		exceptionMetaData.setTimestamp(new Date().getTime());
		exceptionMetaData.setMessage(ex.getMessage());
		exceptionMetaData.setDetails(request.getDescription(false));
		return new ResponseEntity<Object>(exceptionMetaData, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex, 
			                                                      WebRequest request) 
	{
		ExceptionMetaData exceptionMetaData = new ExceptionMetaData();
		exceptionMetaData.setTimestamp(new Date().getTime());
		exceptionMetaData.setMessage(ex.getMessage());
		exceptionMetaData.setDetails(request.getDescription(false));
		return new ResponseEntity<Object>(exceptionMetaData, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(AuthorizationException.class)
	public ResponseEntity<Object> handleAuthorizationException(AuthorizationException ex, 
			                                                      WebRequest request) 
	{
		ExceptionMetaData exceptionMetaData = new ExceptionMetaData();
		exceptionMetaData.setTimestamp(new Date().getTime());
		exceptionMetaData.setMessage(ex.getMessage());
		exceptionMetaData.setDetails(request.getDescription(false));
		return new ResponseEntity<Object>(exceptionMetaData, HttpStatus.UNAUTHORIZED);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex,
			HttpHeaders headers, 
			HttpStatus status, 
			WebRequest request) 
	{
		ExceptionMetaData exceptionMetaData = new ExceptionMetaData();
		exceptionMetaData.setTimestamp(new Date().getTime());
		exceptionMetaData.setMessage("Validation Failure");
		List<String> messages = ex.getBindingResult().getAllErrors().stream().map(err -> err.getDefaultMessage()).collect(Collectors.toList());
		exceptionMetaData.setDetails(messages.toString());		
		return new ResponseEntity<Object>(exceptionMetaData, HttpStatus.BAD_REQUEST);
	}
}