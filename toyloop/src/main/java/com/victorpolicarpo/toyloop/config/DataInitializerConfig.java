package com.victorpolicarpo.toyloop.config;

import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.repository.RoleRepository;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Profile("dev")
@Configuration
@Slf4j
public class DataInitializerConfig implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializerConfig(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        Role roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());
        var userAdmin = userRepository.findByUsername("admin123");
        userAdmin.ifPresentOrElse(
                user -> log.info("Admin já existe"),
                () -> {
                    var user = new User();
                    user.setFullName("Admin Silva");
                    user.setUsername("admin123");
                    user.setEmail("admin@gmail.com");
                    user.setPassword(passwordEncoder.encode("@admin123"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                    log.info("Admin criado com sucesso");
                }
        );
    }
}