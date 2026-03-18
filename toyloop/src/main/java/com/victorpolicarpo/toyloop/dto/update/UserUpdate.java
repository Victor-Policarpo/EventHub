package com.victorpolicarpo.toyloop.dto.update;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String fullName,
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String username,
        @Email(message = "Invalid email format.")
        String email
){
}
