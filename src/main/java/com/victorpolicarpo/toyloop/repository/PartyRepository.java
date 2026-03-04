package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long> {
}
