package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.ForgotPasswordRequest;
import com.victorpolicarpo.toyloop.dto.request.ResetPasswordRequest;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.exception.BadCredentialsException;
import com.victorpolicarpo.toyloop.exception.BusinessRuleException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.frontend.url}")
    private String urlRecoverPassword;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadCredentialsException("User is not authenticated");
        }
        String userIdStr = authentication.getName();
        return userRepository.findById(UUID.fromString(userIdStr)).orElseThrow(
                () -> new ResourceNotFoundException("Authenticated user not found in the database: " + userIdStr)
        );
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest dto) {
        if (dto == null || dto.email() == null){
            throw new BusinessRuleException("Email for recover password is empty");
        }
        var user = userRepository.findByEmail(dto.email()).orElseThrow(
                () -> new ResourceNotFoundException("User with this Email not found or not exist")
        );

        Instant now = Instant.now();
        long expiresIn = 900L;

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("http://my-backend-app")
                .subject(user.getEmail())
                .claim("scope", "PASSWORD_RECOVERY")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .build();
        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        String recoverUrl = String.format("%s?token=%s", urlRecoverPassword, jwtValue);
        emailService.sendSimpleMail(user.getEmail(), user.getUsername(), recoverUrl);
    }

    public void resetPassword(ResetPasswordRequest dto) {

        try {
            Jwt decodedJwt = jwtDecoder.decode(dto.token());
            if (!"PASSWORD_RECOVERY".equals(decodedJwt.getClaimAsString("scope"))){
                throw new BusinessRuleException("This token is invalid for this operation.");
            }
            var user = userRepository.findByEmail(decodedJwt.getSubject()).orElseThrow(
                    () -> new ResourceNotFoundException("User with this E-mail not found or not exist.")
            );
            user.setPassword(passwordEncoder.encode(dto.newPassword()));
            userRepository.save(user);

        } catch (JwtException e){
            throw new BusinessRuleException("The link has expired or is invalid");
        }

    }
}
