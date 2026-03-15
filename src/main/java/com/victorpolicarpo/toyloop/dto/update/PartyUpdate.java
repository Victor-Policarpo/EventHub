package com.victorpolicarpo.toyloop.dto.update;

import com.victorpolicarpo.toyloop.dto.response.EmployeePartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyToyResponse;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public record PartyUpdate(
        @Size(min = 3, max = 100, message = "This field must contain 3 to 100 characters.")
        String name,
        @Size(min = 5, max = 255, message = "Address must be between 5 and 255 characters")
        String address,
        @Pattern(regexp = "\\d{10,11}", message = "number format telephone is invalid")
        String telephone,
        @FutureOrPresent(message = "Start date must be in the present or future")
        LocalDateTime startDateHours,
        @Future(message = "End date must be in the future")
        LocalDateTime endDateHours,
        @PositiveOrZero(message = "Value for four hours must be zero or positive")
        BigDecimal value,
        Set<PartyToyResponse> partyToys,
        Set<EmployeePartyResponse> employees
) {
}
