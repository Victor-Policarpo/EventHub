package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.entity.Toy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToyRepository extends JpaRepository<Toy, Long> {
}
