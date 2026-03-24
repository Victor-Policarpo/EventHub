package com.victorpolicarpo.toyloop.config;

import com.victorpolicarpo.toyloop.entity.Role;
import com.victorpolicarpo.toyloop.entity.User;
import com.victorpolicarpo.toyloop.repository.RoleRepository;
import com.victorpolicarpo.toyloop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@Configuration
public class AdminConfig implements CommandLineRunner {

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public AdminConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());
        var userAdmin = userRepository.findByUsername("admin123");

        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("Admin ja existe");
                },
                () -> {
                    var user = new User();
                    user.setFullName("Admin Silva");
                    user.setUsername("admin123");
                    user.setEmail("admin@gmail.com");
                    user.setPassword(passwordEncoder.encode("@admin123"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                }
        );
    }
}
