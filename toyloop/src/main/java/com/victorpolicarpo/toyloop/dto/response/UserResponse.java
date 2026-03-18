package com.victorpolicarpo.toyloop.dto.response;

import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record UserResponse(
        UUID userId,
        String username,
        String email,
        Boolean active,
        Set<String> roles
) {
    public UserResponse(User user) {
        this(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getActive(),
                user.getRoles().stream().map(
                        Role::getName).collect(Collectors.toSet())
        );
    }
}
