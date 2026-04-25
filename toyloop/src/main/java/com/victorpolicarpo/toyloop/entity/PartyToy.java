package com.victorpolicarpo.toyloop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

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
    @NotFound(action = NotFoundAction.IGNORE)
    private Party party;

    @ManyToOne
    @JoinColumn(name = "toy_id", nullable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private Toy toy;

    private Integer quantity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PartyToy that = (PartyToy) o;
        Long thisPartyId = (this.party != null) ? this.party.getPartyId() : null;
        Long thatPartyId = (that.party != null) ? that.party.getPartyId() : null;

        Long thisToyId = (this.toy != null) ? this.toy.getToyId() : null;
        Long thatToyId = (that.toy != null) ? that.toy.getToyId() : null;

        return Objects.equals(thisPartyId, thatPartyId) &&
                Objects.equals(thisToyId, thatToyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                (party != null) ? party.getPartyId() : null,
                (toy != null) ? toy.getToyId() : null
        );
    }

}
