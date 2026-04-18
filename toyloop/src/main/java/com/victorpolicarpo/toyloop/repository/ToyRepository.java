package com.victorpolicarpo.toyloop.repository;

import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.entity.Toy;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface ToyRepository extends JpaRepository<Toy, Long> {
    boolean existsByName(String name);

    @Override
    @NonNull
    Page<Toy> findAll(@NonNull Pageable pageable);

    @Query("""
            SELECT new com.victorpolicarpo.toyloop.dto.response.ToyResponse(
                t.toyId,
                t.name,
                t.valueForFourHours,
                CAST(
                    GREATEST(0, t.availableQuantity - COALESCE(
                        (SELECT SUM(pt.quantity)
                         FROM PartyToy pt
                         JOIN pt.party p
                         WHERE pt.toy.toyId = t.toyId
                         AND p.partyStatus != 'CANCELED'
                         AND p.startDateHours < :endDate
                         AND p.endDateHours > :startDate
                        ), 0)
                    ) AS int)
            )
            FROM Toy t
            WHERE t.active = true
    """)
    Page<ToyResponse> findAvailableToys(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable
    );
}
