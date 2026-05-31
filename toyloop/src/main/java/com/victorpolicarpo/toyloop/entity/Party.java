package com.victorpolicarpo.toyloop.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "db_party")
@Setter
@Getter
@SQLRestriction("active = true")
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
    @Column(name = "status", nullable = false)
    private PartyStatus partyStatus = PartyStatus.SCHEDULED;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssemblyStatus assemblyStatus = AssemblyStatus.TO_ASSEMBLE;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "db_party_staff",
            joinColumns = @JoinColumn(name = "party_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> employees = new HashSet<>();

    @Column(name = "create_by", nullable = false)
    private UUID createBy;

    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PartyToy> partyToys = new HashSet<>();

    @Column(nullable = false)
    private boolean active = true;

    @Getter
    public enum PartyStatus{
        SCHEDULED,
        IN_PROGRESS,
        FINISHED,
        CANCELED
    }

    @Getter
    public enum AssemblyStatus{
        TO_ASSEMBLE,
        ASSEMBLED,
        TO_DISASSEMBLE,
        DISASSEMBLED,
        NOT_APPLICABLE
    }
}
