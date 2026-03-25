package com.victorpolicarpo.toyloop.dto.response;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        Long expiresIn) {
}
