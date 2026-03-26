package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.request.*;
import com.victorpolicarpo.toyloop.dto.response.LoginResponse;
import com.victorpolicarpo.toyloop.dto.response.TokenRefreshResponse;
import com.victorpolicarpo.toyloop.exception.RefreshTokenException;
import com.victorpolicarpo.toyloop.service.AuthService;
import com.victorpolicarpo.toyloop.service.JwtService;
import com.victorpolicarpo.toyloop.service.LoginService;
import com.victorpolicarpo.toyloop.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/access")
@RequiredArgsConstructor
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final LoginService loginService;
    private final AuthService authService;

    @Value("${app.jwtRefreshExpirationMs}")
    private long refreshTokenDuration;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest dto, HttpServletResponse response){
        LoginResponse loginResponse = loginService.login(dto);
        long maxAgeSeconds = refreshTokenDuration / 1000;
        ResponseCookie cookie = ResponseCookie.from("refreshToken", loginResponse.refreshToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new LoginResponse(
                loginResponse.accessToken(),
                null,
                loginResponse.expiresIn()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequest dto){
        loginService.createUser(dto);
        return new ResponseEntity<>(HttpStatus.CREATED) ;
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenRefreshResponse> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshTokenFromCookie) {
        if (refreshTokenFromCookie == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return refreshTokenService.findByToken(refreshTokenFromCookie)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    var user = refreshToken.getUser();
                    String newAccessToken = jwtService.generateAccessToken(user);
                    return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken, null));
                })
                .orElseThrow(() -> new RefreshTokenException("Refresh token not found or does not exist"));
    }

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
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {
        if (refreshToken != null) {
            loginService.logout(refreshToken);
        }
        ResponseCookie cleanCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cleanCookie.toString());
        return ResponseEntity.noContent().build();
    }

}
