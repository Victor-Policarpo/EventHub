package com.victorpolicarpo.toyloop.dto.response;

import com.victorpolicarpo.toyloop.entity.Toy;

import java.math.BigDecimal;

public record ToyResponse(
        Long toyId,
        String name,
        BigDecimal valueForFourHours,
        Integer availableQuantity,
        Toy.Status active
) {
}
