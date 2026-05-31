package com.victorpolicarpo.toyloop.dto.response;

import java.time.LocalDateTime;

public record PartyHistoryResponse(
        Long id, String action, LocalDateTime performedAt, UserSimpleResponse performedBy
) {}
