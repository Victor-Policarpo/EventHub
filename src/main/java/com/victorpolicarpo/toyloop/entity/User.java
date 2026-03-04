package com.victorpolicarpo.toyloop.entity;

import com.victorpolicarpo.toyloop.dto.request.LoginRequest;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "db_users")
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private Boolean active = true;

    @ManyToMany(cascade = CascadeType.DETACH,fetch = FetchType.EAGER)
    @JoinTable(
            name = "db_users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")

    )
    private Set<Role> roles = new HashSet<>();


    public boolean isLoginCorrect(LoginRequest dto, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(dto.password(), this.password);
    }
}
