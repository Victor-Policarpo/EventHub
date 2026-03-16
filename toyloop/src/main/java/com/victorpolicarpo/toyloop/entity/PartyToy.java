package com.victorpolicarpo.toyloop.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name = "db_parties_toys")
@Setter
@Getter
public class PartyToy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "party_id", nullable = false)
    private Party party;

    @ManyToOne
    @JoinColumn(name = "toy_id", nullable = false)
    private Toy toy;

    private Integer quantity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyToy partyToy = (PartyToy) o;
        return Objects.equals(party.getPartyId(), partyToy.party.getPartyId()) &&
                Objects.equals(toy.getToyId(), partyToy.toy.getToyId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(party != null ? party.getPartyId() : null,
                toy != null ? toy.getToyId() : null);
    }

}
