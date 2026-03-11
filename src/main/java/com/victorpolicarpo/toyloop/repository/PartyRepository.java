package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Party;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface PartyRepository extends JpaRepository<Party, Long> {
    boolean existsByStartDateHours(LocalDateTime startHoursDate);
    boolean existsByAddress(String address);
}
