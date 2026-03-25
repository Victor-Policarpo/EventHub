package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.*;
import com.victorpolicarpo.toyloop.dto.response.LoginResponse;
import com.victorpolicarpo.toyloop.dto.response.TokenRefreshResponse;
import com.victorpolicarpo.toyloop.exception.RefreshTokenException;
import com.victorpolicarpo.toyloop.service.AuthService;
import com.victorpolicarpo.toyloop.service.JwtService;
import com.victorpolicarpo.toyloop.service.LoginService;
import com.victorpolicarpo.toyloop.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/access")
@RequiredArgsConstructor
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest dto){
        return ResponseEntity.ok(loginService.login(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequest dto){
        loginService.createUser(dto);
        return new ResponseEntity<>(HttpStatus.CREATED) ;
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenRefreshResponse> refreshToken(@RequestBody TokenRefreshRequest dto) {
        String requestToken = dto.refreshToken();

        return refreshTokenService.findByToken(requestToken)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    var user = refreshToken.getUser();
                    String newAccessToken = jwtService.generateAccessToken(user);
                    return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken, requestToken));
                })
                .orElseThrow(() -> new RefreshTokenException("Refresh token não encontrado ou inválido!"));
    }

    private final AuthService authService;
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest dto){
        authService.forgotPassword(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest dto){
        authService.resetPassword(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequest dto){
        loginService.logout(dto.refreshToken());
        return ResponseEntity.noContent().build();
    }

}
