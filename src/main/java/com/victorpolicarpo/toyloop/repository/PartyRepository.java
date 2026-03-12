package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Party;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface PartyRepository extends JpaRepository<Party, Long> {
    boolean existsByStartDateHours(LocalDateTime startHoursDate);
    boolean existsByAddress(String address);

    @Query("SELECT p FROM Party p WHERE " +
            "(:pStatus IS NULL OR p.partyStatus = :pStatus) AND " +
            "(:aStatus IS NULL OR p.assemblyStatus = :aStatus) AND " +
            "(CAST(:date AS localdate) IS NULL OR CAST(p.startDateHours AS date) = :date)")
    Page<Party> findByFilters(
            @Param("pStatus") Party.PartyStatus pStatus,
            @Param("aStatus") Party.AssemblyStatus aStatus,
            @Param("date") LocalDate date,
            Pageable pageable);
}
