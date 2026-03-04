package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.UserRequest;
import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import org.mapstruct.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    User toEntity(UserRequest userRequest, @Context PasswordEncoder passwordEncoder, @Context Role basicRole);

    @AfterMapping
    default void handleFields(UserRequest dto, @MappingTarget User entity, @Context Role basicRole, @Context PasswordEncoder encoder){
        if (dto.password() != null){
            entity.setPassword(encoder.encode(dto.password()));
        }

        if (basicRole != null){
            entity.getRoles().add(basicRole);
        }
    }
}
