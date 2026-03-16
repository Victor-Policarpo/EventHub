package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.PartyToy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PartyToyRepository extends JpaRepository<PartyToy, Long> {


    @Query("""
            SELECT pt.toy.toyId as toyId, SUM(pt.quantity) as occupiedQty
            FROM PartyToy pt
            WHERE pt.party.partyStatus IN ('SCHEDULED', 'IN_PROGRESS')
            AND pt.party.startDateHours < :end
            AND pt.party.endDateHours > :start
            GROUP BY pt.toy.toyId
""")
    List<ToyOccupationProjection> findAllOccupiedQuantities(
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

    interface ToyOccupationProjection {
        Long getToyId();

        Integer getOccupiedQty();
    }
}
