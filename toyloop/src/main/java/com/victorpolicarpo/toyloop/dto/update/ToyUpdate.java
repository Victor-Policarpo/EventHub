package com.victorpolicarpo.toyloop.dto.update;

import com.victorpolicarpo.toyloop.entity.Toy;

import java.math.BigDecimal;

public record ToyUpdate(
        String name,
        BigDecimal valueForFourHours,
        Integer availableQuantity
) {
}
