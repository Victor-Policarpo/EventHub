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
import org.springframework.beans.factory.annotation.Value;
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
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Value("${app.tokenJwtExpirationMs}")
    private long jwtExpiresIn;

    public LoginResponse login(LoginRequest dto) {
        var user = userRepository.findByUsername(dto.username());
        if (user.isEmpty() || !user.get().isLoginCorrect(dto, passwordEncoder)){
            throw new BadCredentialsException("User or Password is invalid!");
        }

        if (!user.get().getActive()){
            throw new DisabledException("This account is disabled. Please contact the administrator.");
        }

        String jwt = jwtService.generateAccessToken(user.get());
        var refreshToken = refreshTokenService.createRefreshToken(user.get().getUserId());
        return new LoginResponse(jwt, refreshToken.getToken(), jwtExpiresIn);
    }

    @Transactional
    public void createUser(UserRequest dto) {
       var basicRole = roleRepository.findByName(Role.Values.BASIC.name());
       boolean userExists = userRepository.existsByUsernameIgnoreCase(dto.username());
       boolean emailExists = userRepository.existsByEmailIgnoreCase(dto.email());
       if (userExists){
           throw new ResourceAlreadyExistsException("A user with this username already exists.");
       }
        if (emailExists) {
            throw new ResourceAlreadyExistsException("A user with this email already exists.");
        }
       User user = userMapper.toEntity(dto, passwordEncoder, basicRole);
       userRepository.save(user);
    }

    public void logout(String refreshToken){
        refreshTokenService.deleteByToken(refreshToken);
    }

}
