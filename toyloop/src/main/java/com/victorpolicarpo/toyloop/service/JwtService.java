package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtEncoder jwtEncoder;

    @Value("${app.tokenJwtExpirationMs}")
    private long jwtExpiresIn;

    public String generateAccessToken(User user){
        Instant now = Instant.now();
        var scopes = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("http://my-backend-app")
                .subject(user.getUserId().toString())
                .issuedAt(now)
                .expiresAt(now.plusMillis(jwtExpiresIn))
                .claim("scope", scopes)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
