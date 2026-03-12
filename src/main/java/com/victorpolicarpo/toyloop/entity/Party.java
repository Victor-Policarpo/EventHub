package com.victorpolicarpo.toyloop.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
    @Column(name = "status", nullable = false)
    private PartyStatus partyStatus = PartyStatus.SCHEDULED;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssemblyStatus assemblyStatus = AssemblyStatus.TO_ASSEMBLE;

    @ManyToMany
    @JoinTable(
            name = "db_party_staff",
            joinColumns = @JoinColumn(name = "party_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> employees = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "create_by", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
    @JsonIdentityReference(alwaysAsId = true)
    private User createBy;

    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL)
    private Set<PartyToy> partyToys = new HashSet<>();


    @Getter
    public enum PartyStatus{
        SCHEDULED,
        IN_PROGRESS,
        FINISHED,
        CANCELED;
    }

    @Getter
    public enum AssemblyStatus{
        TO_ASSEMBLE,
        ASSEMBLED,
        TO_DISASSEMBLE,
        DISASSEMBLED;
    }
}
