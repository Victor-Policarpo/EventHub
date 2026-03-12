package com.victorpolicarpo.toyloop.dto.response;

import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.entity.PartyToy;
import com.victorpolicarpo.toyloop.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public record PartyResponse(
        Long partyId,
        String name,
        String address,
        String telephone,
        LocalDateTime startDateHours,
        LocalDateTime endDateHours,
        BigDecimal value,
        Set<PartyToyResponse> partyToys,
        Set<EmployeePartyResponse> employees,
        UUID createBy,
        Party.AssemblyStatus assemblyStatus,
        Party.PartyStatus partyStatus
) { }
