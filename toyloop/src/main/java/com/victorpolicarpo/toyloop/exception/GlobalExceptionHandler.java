package com.victorpolicarpo.toyloop.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.NOT_FOUND.value());
        err.setError("Resource not found");
        err.setMessage(e.getMessage());
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> methodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest http){
        ValidationError err = new ValidationError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.BAD_REQUEST.value());
        err.setError("Validation Error");
        err.setMessage("One or more validation erros");
        err.setPath(http.getRequestURI());
        for (FieldError f: e.getBindingResult().getFieldErrors()){
            err.addError(f.getField(), f.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<StandardError> dataIntegrityViolationException(DataIntegrityViolationException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.CONFLICT.value());
        err.setError("Database integrity violation");
        err.setMessage(e.getMessage());
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<StandardError> userAlreadyExistsException(ResourceAlreadyExistsException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.CONFLICT.value());
        err.setMessage(e.getMessage());
        err.setError("Conflict");
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardError> badCredentialsException(BadCredentialsException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.UNAUTHORIZED.value());
        err.setError("Unauthorized");
        err.setMessage(e.getMessage());
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
    }

    @ExceptionHandler(ResourceBusyException.class)
    public ResponseEntity<ResourceConflictError> resourceBusyException(ResourceBusyException e, HttpServletRequest http) {
        ResourceConflictError err = new ResourceConflictError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.UNPROCESSABLE_CONTENT.value());
        err.setError("Unprocessable Content");
        err.setMessage(e.getMessage());
        err.setPath(http.getRequestURI());
        for (ResourceConflict f: e.getErrors()) {
            err.addConflict(f);
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(err);
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<StandardError> businessRuleException(BusinessRuleException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.UNPROCESSABLE_CONTENT.value());
        err.setError("Unprocessable Content");
        err.setMessage(e.getMessage());
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(err);
    }

    @ExceptionHandler(MessagingServiceException.class)
    public ResponseEntity<StandardError> messagingException(MessagingServiceException e, HttpServletRequest http) {
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
        err.setMessage(e.getMessage());
        err.setError("Email Service Unavailable");
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(err);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<StandardError> disabledException(DisabledException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.UNAUTHORIZED.value());
        err.setMessage(e.getMessage());
        err.setError("Account Disabled");
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
    }

}
