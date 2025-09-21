package com.backend.backend.services;

import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.dto.VerifyDto;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public User signup(RegisterUserDto registerUserDto) {
        try {
            if(!registerUserDto.getPassword().equals(registerUserDto.getPasswordConfirmation())) throw new RuntimeException("Passwords do not match");
            Optional<User> userEmail = userRepository.findByEmail(registerUserDto.getEmail());
            if(userEmail.isPresent()) throw new RuntimeException("User with this email already exists");
            User user = new User(registerUserDto.getEmail(), registerUserDto.getName(), passwordEncoder.encode(registerUserDto.getPassword()));
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
            user.setEnabled(false);
            userRepository.save(user);
            emailService.sendVerificationEmailTemplate(user);
            return user;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public User authenticate(LoginUserDto loginUserDto) {
        User user = userRepository.findByEmail(loginUserDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword()));
        return user;
    }

    public User verifyUser(VerifyDto verifyDto) {
        User user = userRepository.findById(verifyDto.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) throw new RuntimeException("Verification code expired");
        if(!user.getVerificationCode().equals(verifyDto.getCode()))  throw new RuntimeException("Verification code not match");
        user.setVerificationCode(null);
        user.setVerificationCodeExpiresAt(null);
        user.setEnabled(true);
        userRepository.save(user);
        return user;
    }

    public User resend(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);
        emailService.sendVerificationEmailTemplate(user);
        return user;
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
