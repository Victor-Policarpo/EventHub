package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Email(message = "Invalid email format.")
        String email
) {
}
