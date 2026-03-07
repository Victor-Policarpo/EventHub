package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByName(String name);
}
