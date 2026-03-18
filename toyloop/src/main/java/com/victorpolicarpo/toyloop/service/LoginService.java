package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.LoginRequest;
import com.victorpolicarpo.toyloop.dto.request.UserRequest;
import com.victorpolicarpo.toyloop.dto.response.LoginResponse;
import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.UserMapper;
import com.victorpolicarpo.toyloop.repository.RoleRepository;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    public LoginResponse login(LoginRequest dto) {
        var user = userRepository.findByUsername(dto.username());
        if (user.isEmpty() || !user.get().isLoginCorrect(dto, passwordEncoder)){
            throw new BadCredentialsException("User or Password is invalid!");
        }

        if (!user.get().getActive()){
            throw new DisabledException("This account is disabled. Please contact the administrator.");
        }

        Instant now = Instant.now();
        long expiresIn = 600L;
        var scopes = user.get().getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("http://my-backend-app")
                .subject(user.get().getUserId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        return new LoginResponse(jwtValue, expiresIn);
    }

    @Transactional
    public void createUser(@Valid UserRequest dto) {
       var basicRole = roleRepository.findByName(Role.Values.BASIC.name());
       var userFromDb = userRepository.findByUsername(dto.username());
       if (userFromDb.isPresent()){
           throw new ResourceAlreadyExistsException("A user with this username already exists.");
       }
       User user = userMapper.toEntity(dto, passwordEncoder, basicRole);
       userRepository.save(user);
    }
}
