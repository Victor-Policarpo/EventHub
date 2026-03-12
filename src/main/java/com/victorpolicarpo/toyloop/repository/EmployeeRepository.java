package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByName(String name);


    @Query("""
        SELECT COUNT(e) FROM Party p
        JOIN p.employees e
        WHERE e.employeeId = :employeeId
        AND p.partyStatus != 'CANCELED'
        AND (p.startDateHours < :end AND p.endDateHours > :start)
""")
    Long countOccupiedEmployee(
            @Param("employeeId") Long employeeId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
            );

}
