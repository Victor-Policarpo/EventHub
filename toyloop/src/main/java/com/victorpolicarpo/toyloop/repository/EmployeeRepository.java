package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByName(String name);


    @Query("""
            SELECT COUNT(e) FROM Party p
            JOIN p.employees e
            WHERE e.employeeId = :employeeId
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

    @Query("""
            SELECT e.employeeId
            FROM Party p
            JOIN p.employees e
            WHERE p.partyStatus IN ('SCHEDULED', 'IN_PROGRESS')
            AND p.startDateHours < :end
            AND p.endDateHours > :start
""")
    List<Long> findOccupiedEmployeeIds(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
