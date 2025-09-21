package com.backend.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RegisterUserDto {

    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Your password must be at least 8 characters long")
    private String password;
    private String passwordConfirmation;
}
