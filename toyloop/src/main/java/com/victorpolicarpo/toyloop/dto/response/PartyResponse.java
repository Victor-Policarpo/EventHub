package com.victorpolicarpo.toyloop.dto.response;

import com.victorpolicarpo.toyloop.entity.Party;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

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
        UserSimpleResponse createBy,
        Party.AssemblyStatus assemblyStatus,
        Party.PartyStatus partyStatus
) { }
