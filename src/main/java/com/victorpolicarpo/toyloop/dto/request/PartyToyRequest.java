package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PartyToyRequest(
        @NotNull
        Long toyId,
        @NotNull
        @Positive
        Integer quantity
){
}
