package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResourceNotFoundException("User is not authenticated");
        }
        String userIdStr = authentication.getName();
        return userRepository.findById(UUID.fromString(userIdStr)).orElseThrow(
                () -> new ResourceNotFoundException("Authenticated user not found in the database: " + userIdStr)
        );
    }
}
