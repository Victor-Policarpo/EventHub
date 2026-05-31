package com.victorpolicarpo.toyloop.entity;

import com.victorpolicarpo.toyloop.enums.PartyAction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "db_party_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    @Enumerated(EnumType.STRING)
    private PartyAction action;

    private UUID performedBy;

    private LocalDateTime performedAt;
}
