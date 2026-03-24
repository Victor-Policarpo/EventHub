package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.response.UserResponse;
import com.victorpolicarpo.toyloop.dto.update.PasswordUpdate;
import com.victorpolicarpo.toyloop.dto.update.UserUpdate;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.exception.BusinessRuleException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.mapper.UserMapper;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> listAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toListResponseDto(users);
    }

    @Transactional
    public UserResponse updateUser(UserUpdate dto, UUID id) {
        User user = findById(id);
        if (dto.username() != null && !dto.username().isBlank()){
            if (!user.getUsername().equalsIgnoreCase(dto.username())){
                boolean exists = userRepository.existsByUsernameIgnoreCase(dto.username());
                if (exists) {
                    throw new ResourceAlreadyExistsException("There is already a user with this username");
                }
            }
        }
        if (dto.email() != null && !dto.email().isBlank()){
            if (!user.getEmail().equalsIgnoreCase(dto.email())){
                boolean exists = userRepository.existsByEmailIgnoreCase(dto.email());
                if (exists) {
                    throw new ResourceAlreadyExistsException("There is already a user with this E-mail");
                }
            }
        }
        userMapper.updateEntityFromDto(dto, user);
        return userMapper.toResponseDto(userRepository.save(user));
    }


    @Transactional
    public void updatePassword(PasswordUpdate dto, UUID id) {
        User user = findById(id);
       if (!passwordEncoder.matches(dto.oldPassword(), user.getPassword())){
           throw new BusinessRuleException("The password is incorrect");
       }
        user.setPassword(passwordEncoder.encode(dto.newPassword()));
       userRepository.save(user);
    }

    public User findById(UUID id){
        return userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User with this Id not found or not exist.")
        );
    }

    public UserResponse findUser(UUID id) {
        return userMapper.toResponseDto(findById(id));
    }

    @Transactional
    public void deleteUser(UUID id) {
        User user = findById(id);
        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void enableUser(UUID id) {
        User user = findById(id);
        user.setActive(true);
        userRepository.save(user);
    }
}
