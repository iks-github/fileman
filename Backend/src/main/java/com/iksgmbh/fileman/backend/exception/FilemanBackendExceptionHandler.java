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
