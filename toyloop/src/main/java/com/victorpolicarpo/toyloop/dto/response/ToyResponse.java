package com.victorpolicarpo.toyloop.dto.response;

import java.math.BigDecimal;

public record ToyResponse(
        Long toyId,
        String name,
        BigDecimal valueForFourHours,
        Integer availableQuantity
){
}
