package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Party;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface PartyRepository extends JpaRepository<Party, Long> {
    @Query("""
            SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END
            FROM Party p
            WHERE p.startDateHours = :date
            AND p.address = :address
            AND p.partyStatus != 'CANCELED'
            AND p.active = true
""")
    boolean existsByStartDateHoursAndAddress(LocalDateTime date, String address);

    @Query("SELECT p FROM Party p WHERE " +
            "(:pStatus IS NULL OR p.partyStatus = :pStatus) AND " +
            "(:aStatus IS NULL OR p.assemblyStatus = :aStatus) AND " +
            "(CAST(:date AS localdate) IS NULL OR CAST(p.startDateHours AS date) = :date)")
    Page<Party> findByFilters(
            @Param("pStatus") Party.PartyStatus pStatus,
            @Param("aStatus") Party.AssemblyStatus aStatus,
            @Param("date") LocalDate date,
            Pageable pageable);

    @Query("""
           SELECT p FROM Party p
           WHERE p.partyStatus = 'IN_PROGRESS'
           AND p.endDateHours <= :threshold
           AND p.active = true
""")
    List<Party> findPartiesToAutoFinish(@Param("threshold") LocalDateTime threshold);
    long countByPartyStatusAndStartDateHoursBetween(Party.PartyStatus status, LocalDateTime start, LocalDateTime end);
    @Query("""
            SELECT SUM(p.value)
            FROM Party p
            WHERE p.partyStatus = :status
            AND p.startDateHours BETWEEN :start AND :end
    """)
    BigDecimal sumRevenueByStatusAndRange(
            @Param("status") Party.PartyStatus status,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );


}
