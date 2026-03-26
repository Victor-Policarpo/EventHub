package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.entity.RefreshToken;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.exception.RefreshTokenException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.repository.RefreshTokenRepository;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${app.jwtRefreshExpirationMs}")
    private long refreshTokenDuration;
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Transactional
    public RefreshToken createRefreshToken(UUID userId){
        refreshTokenRepository.deleteByUserId(userId);
        refreshTokenRepository.flush();
        RefreshToken refreshToken = new RefreshToken();
        User user = findUserById(userId);
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plusMillis(refreshTokenDuration));
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }


    public RefreshToken verifyExpiration(RefreshToken token){
        if (token.getExpiresAt().compareTo(Instant.now()) < 0){
            refreshTokenRepository.delete(token);
            throw new RefreshTokenException("Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public void deleteByToken(String token){
        refreshTokenRepository.findByToken(token).ifPresent(refreshTokenRepository::delete);
    }

    public User findUserById(UUID id){
        return userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User ID not found.")
        );
    }
}
