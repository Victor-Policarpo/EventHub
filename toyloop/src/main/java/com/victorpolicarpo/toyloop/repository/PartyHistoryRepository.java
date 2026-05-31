package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.PartyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PartyHistoryRepository extends JpaRepository<PartyHistory, Long> {
    @Query("SELECT p FROM PartyHistory p WHERE p.party.partyId = :partyId ORDER BY p.id DESC")
    List<PartyHistory> findByPartyId(@Param("partyId") Long partyId);
}
