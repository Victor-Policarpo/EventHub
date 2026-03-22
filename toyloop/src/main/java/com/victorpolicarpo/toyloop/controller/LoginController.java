package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.LoginRequest;
import com.victorpolicarpo.toyloop.dto.request.UserRequest;
import com.victorpolicarpo.toyloop.dto.response.LoginResponse;
import com.victorpolicarpo.toyloop.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest dto){
        return ResponseEntity.ok(loginService.login(dto));
    }

    @PostMapping
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequest dto){
        loginService.createUser(dto);
        return new ResponseEntity<>(HttpStatus.CREATED) ;
    }
}
