package com.victorpolicarpo.toyloop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EmployeeRequest(
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Size(min = 3, max = 50, message = "This field must contain 3 to 50 characters.")
        String name,
        @NotBlank(message = "This field is required and cannot be left blank.")
        @Pattern(regexp = "^(\\d|\\(|\\)|\\s){10,20}$", message = "number format telephone is invalid")
        String telephone
){
}