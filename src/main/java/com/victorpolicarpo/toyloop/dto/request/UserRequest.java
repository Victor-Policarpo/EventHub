package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.*;

public record UserRequest(
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Size(min = 3, max = 100, message = "This field must contain 3 to 100 characters.")
        String fullName,
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String username,
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Email(message = "Invalid email format.")
        String email,
        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).*$",
                message = "Your password must contain at least one special character, one number, and one letter."
        )
        @Size(min = 8, max = 16, message = "This field must contain 8 to 16 characters.")
        String password
) {
}
