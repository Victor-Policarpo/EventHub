package com.victorpolicarpo.toyloop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "db_party")
@Setter
@Getter
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_id")
    private Long partyId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String telephone;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private LocalDateTime startDateHours;
    @Column(nullable = false)
    private LocalDateTime endDateHours;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.SCHEDULED;

    @ManyToMany
    @JoinTable(
            name = "db_party_staff",
            joinColumns = @JoinColumn(name = "party_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> staff = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "create_by_id", nullable = false)
    private User createBy;

    @ManyToMany
    @JoinTable(
            name = "db_parties_toys",
            joinColumns = @JoinColumn(name = "party_id"),
            inverseJoinColumns = @JoinColumn(name = "toy_id")
    )
    private Set<Toy> toys = new HashSet<>();


    @Getter
    public enum Status{
        SCHEDULED(1L),
        IN_PROGRESS(2L),
        FINISHED(3L),
        CANCELED(4L);

        final long code;

        Status(long code) {
            this.code = code;
        }
    }
}
