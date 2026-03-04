package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
