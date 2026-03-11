package com.victorpolicarpo.toyloop.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;

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
        return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<StandardError> userAlreadyExistsException(ResourceAlreadyExistsException e, HttpServletRequest http){
        StandardError err = new StandardError();
        err.setTimestamp(Instant.now());
        err.setStatus(HttpStatus.BAD_REQUEST.value());
        err.setMessage(e.getMessage());
        err.setError("Conflict");
        err.setPath(http.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
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

}
