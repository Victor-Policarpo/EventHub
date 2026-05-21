package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.entity.Employee;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Page<Employee> findByActiveTrue(Pageable pageable);

    @Query("""
            SELECT COUNT(e) FROM Party p
            JOIN p.employees e
            WHERE e.employeeId = :employeeId
            AND e.active = true
            AND p.partyId <> :excludePartyId
            AND p.partyStatus <> 'CANCELED'
            AND (p.startDateHours < :end AND p.endDateHours > :start)
""")
    Long countOccupiedEmployeeExcludingParty(
            @Param("employeeId") Long employeeId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("excludePartyId") Long excludePartyId
    );

    @Override
    @NonNull
    Page<Employee> findAll(@NonNull Pageable pageable);

    @Query("""
            SELECT new com.victorpolicarpo.toyloop.dto.response.EmployeeResponse(
                e.employeeId,
                e.name,
                e.telephone,
                CASE WHEN (
                    SELECT COUNT(p)
                    FROM Party p
                    JOIN p.employees emp
                    WHERE emp.employeeId = e.employeeId
                    AND p.partyStatus != 'CANCELED'
                    AND p.partyId != :excludePartyId
                    AND p.startDateHours < :endDate
                    AND p.endDateHours > :startDate
                ) > 0 THEN false ELSE true END
            )
            FROM Employee e
            WHERE e.active = true
    """)
    Page<EmployeeResponse> findAvailableEmployees(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("excludePartyId") Long excludePartyId,
            Pageable pageable
    );

    boolean existsByNameAndActiveTrue(String name);

}
