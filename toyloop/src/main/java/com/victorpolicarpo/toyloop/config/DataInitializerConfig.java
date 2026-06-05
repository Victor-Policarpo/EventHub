package com.victorpolicarpo.toyloop.config;

import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.repository.RoleRepository;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;
import java.util.UUID;

@Configuration
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
                user -> System.out.println("Admin já existe"),
                () -> {
                    var user = new User();
                    user.setFullName("Admin Silva");
                    user.setUsername("admin123");
                    user.setEmail("admin@gmail.com");
                    user.setPassword(passwordEncoder.encode("@admin123"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                    System.out.println("Admin criado com sucesso");
                }
        );

        Role roleSystem = roleRepository.findByName(Role.Values.SYSTEM.name());

        var userSystem = userRepository.findByUsername("SystemAuth");

        userSystem.ifPresentOrElse(
                user -> System.out.println("Usuário de Sistema já existe"),
                () -> {
                    var user = new User();
                    user.setFullName("System Automation");
                    user.setUsername("SystemAuth");
                    user.setEmail("system@eventhub.host");
                    user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

                    user.setRoles(Set.of(roleSystem));
                    userRepository.save(user);
                    System.out.println("Usuário de Sistema criado com sucesso");
                }
        );
    }
}