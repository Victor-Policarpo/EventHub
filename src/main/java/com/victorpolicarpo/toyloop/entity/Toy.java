package com.victorpolicarpo.toyloop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "db_toys")
@Setter
@Getter
public class Toy {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "toy_id")
    private Long toyId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valueForFourHours;
    @Column(nullable = false)
    private Integer availableQuantity;
    @Enumerated(EnumType.STRING)
    private Status active = Status.AVAILABLE;

    @Getter
    public enum Status{
        AVAILABLE(1L),
        USING(2L),
        MAINTENANCE(3L);
        final long code;

        Status(long code) {
            this.code = code;
        }
    }
}
