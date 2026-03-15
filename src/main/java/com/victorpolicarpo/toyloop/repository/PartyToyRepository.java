package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.PartyToy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface PartyToyRepository extends JpaRepository<PartyToy, Long> {


    @Query("""
            SELECT SUM(pt.quantity)
            FROM PartyToy pt
            WHERE pt.toy.toyId = :toyId
            AND pt.party.partyStatus IN ('SCHEDULED', 'IN_PROGRESS')
            AND (pt.party.startDateHours < :end AND pt.party.endDateHours > :start)
    """)
    Integer getQuantityBusy(
            @Param("toyId") Long toyId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
            );

    @Query("""
    SELECT SUM(pt.quantity)
    FROM PartyToy pt
    JOIN pt.party p
    WHERE pt.toy.toyId = :toyId
    AND p.partyId <> :excludePartyId
    AND p.partyStatus <> 'CANCELED'
    AND (:start < p.endDateHours AND :end > p.startDateHours)
""")
    Integer getQuantityBusyExcludingParty(Long toyId, LocalDateTime start, LocalDateTime end, Long excludePartyId);
}
