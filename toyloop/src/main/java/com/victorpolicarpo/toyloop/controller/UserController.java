package com.victorpolicarpo.toyloop.controller;

import com.victorpolicarpo.toyloop.dto.response.UserResponse;
import com.victorpolicarpo.toyloop.dto.update.PasswordUpdate;
import com.victorpolicarpo.toyloop.dto.update.UserUpdate;
import com.victorpolicarpo.toyloop.service.AuthService;
import com.victorpolicarpo.toyloop.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @GetMapping()
    public ResponseEntity<UserResponse> findUserById(){
        return ResponseEntity.ok(userService.findUser(authService.getAuthenticatedUserId()));
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<UserResponse>> listAllUsers(){
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @PatchMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@Valid @RequestBody UserUpdate dto){
        return ResponseEntity.ok(userService.updateUser(dto, authService.getAuthenticatedUserId()));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordUpdate dto){
        userService.updatePassword(dto, authService.getAuthenticatedUserId());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @PatchMapping("/enable/{id}")
    public ResponseEntity<Void> enableUser(@PathVariable UUID id){
        userService.enableUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/me")
    public ResponseEntity<Void> deleteMyUser(){
        userService.deleteUser(authService.getAuthenticatedUserId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Void> deleteUserById(@PathVariable UUID id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
