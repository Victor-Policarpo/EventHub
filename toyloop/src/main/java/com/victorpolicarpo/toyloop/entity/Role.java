package com.victorpolicarpo.toyloop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "db_roles")
@Setter
@Getter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "role_id")
    private Long roleId;
    private String name;

    @Getter
    public enum Values{
        ADMIN(1L),
        BASIC(2L);

        final long value;

        Values(long value) {
            this.value = value;
        }
    }

}
