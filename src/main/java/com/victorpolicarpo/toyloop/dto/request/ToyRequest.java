package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ToyRequest(
        @NotBlank(message = "This field is required and cannot be blank.")
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String name,
        @NotNull(message = "Value for four hours cannot be null")
        @PositiveOrZero(message = "Value for four hours must be zero or positive")
        BigDecimal valueForFourHours,
        @NotNull(message = "Value for four hours cannot be null")
        @PositiveOrZero(message = "Value for four hours must be zero or positive")
        Integer availableQuantity
){
}
