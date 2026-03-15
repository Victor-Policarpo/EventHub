package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public record PartyRequest(
        @NotBlank(message = "This field is required and cannot be blank.")
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String name,
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Pattern(regexp = "^(\\d|\\(|\\)|\\s){10,20}$", message = "number format telephone is invalid")
        String telephone,
        @NotBlank(message = "This field is required and cannot be blank.")
        @Size(min = 5, max = 255, message = "Address must be between 5 and 255 characters")
        String address,
        @NotNull(message = "Start date is required")
        @FutureOrPresent(message = "Start date must be in the present or future")
        LocalDateTime startDateHours,
        @Future(message = "End date must be in the future")
        LocalDateTime endDateHours,
        @PositiveOrZero(message = "Value for four hours must be zero or positive")
        BigDecimal value,
        @NotEmpty(message = "At least one toy is required")
        Set<PartyToyRequest> toys,
        Set<Long> employeeId
) {
}
