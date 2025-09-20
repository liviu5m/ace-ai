package com.backend.backend.controller;

import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.dto.VerifyDto;
import com.backend.backend.model.User;
import com.backend.backend.response.LoginResponse;
import com.backend.backend.services.AuthenticationService;
import com.backend.backend.services.EmailService;
import com.backend.backend.services.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterUserDto registerUserDto){
        try {
            User registeredUser = authenticationService.signup(registerUserDto);
            return ResponseEntity.ok(registeredUser);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto loginUserDto){
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);
            String jwtToken = jwtService.generateToken(authenticatedUser);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
            return ResponseEntity.ok(loginResponse);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyDto verifyDto){
        try{
            authenticationService.verifyUser(verifyDto);
            return ResponseEntity.ok("Account verified successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/resend")
    public ResponseEntity<?> resendVerification(@RequestBody VerifyDto verifyDto){
        try{
            authenticationService.resend(verifyDto.getId());
            return ResponseEntity.ok("Resend successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
