package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.dto.request.PartyToyRequest;
import com.victorpolicarpo.toyloop.entity.Toy;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ToyRepository extends JpaRepository<Toy, Long> {
    boolean existsByName(String name);
}
