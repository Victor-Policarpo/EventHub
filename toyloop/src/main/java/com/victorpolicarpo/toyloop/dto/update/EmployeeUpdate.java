package com.victorpolicarpo.toyloop.dto.update;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EmployeeUpdate(
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String name,
        @Pattern(regexp = "^(\\d|\\(|\\)|\\s){10,20}$", message = "number format telephone is invalid")
        String telephone
) {
}
