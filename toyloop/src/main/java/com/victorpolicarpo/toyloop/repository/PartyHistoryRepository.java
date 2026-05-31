package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.PartyHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyHistoryRepository extends JpaRepository<PartyHistory, Long> {
}
