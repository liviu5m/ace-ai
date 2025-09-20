package com.backend.backend.dto;

import lombok.Getter;

@Getter
public class RegisterUserDto {
    private String email;
    private String name;
    private String password;
    private String passwordConfirmation;
}
