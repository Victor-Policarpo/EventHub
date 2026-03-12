package com.victorpolicarpo.toyloop.dto.response;

import com.victorpolicarpo.toyloop.entity.Party;

import java.time.LocalDateTime;

public record ListPartyResponse(
        Long partyId,
        String name,
        String address,
        LocalDateTime startDateHours,
        Party.AssemblyStatus assemblyStatus,
        Party.PartyStatus partyStatus
) {
}
