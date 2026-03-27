package com.ticket.backend.controller;

import com.ticket.backend.model.Otp;
import com.ticket.backend.model.User;
import com.ticket.backend.repository.UserRepository;
import com.ticket.backend.repository.OtpRepository;
import com.ticket.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private OtpRepository otpRepository;

    // ========================
    // 1️⃣ Login endpoint
    // ========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User dbUser = userRepository.findByEmail(loginUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        if (!dbUser.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid Credentials ❌");
        }

        dbUser.setPassword(null); // hide password
        return ResponseEntity.ok(dbUser);
    }

    // ========================
    // 2️⃣ Get all users
    // ========================
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        var users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null)); // hide passwords
        return ResponseEntity.ok(users);
    }

    // ========================
    // 3️⃣ Get user by ID
    // ========================
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));
        user.setPassword(null); // hide password
        return ResponseEntity.ok(user);
    }

    // ========================
    // 4️⃣ Create user
    // ========================
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User newUser = userRepository.save(user);
        newUser.setPassword(null); // hide password
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // ========================
    // 5️⃣ Send OTP via email
    // ========================
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        try {
            userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found ❌"));

            otpService.sendOtp(email); // Send OTP using OtpService

            System.out.println("OTP sent to: " + email);
            return ResponseEntity.ok("OTP sent successfully ✅");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to send OTP: " + e.getMessage());
        }
    }

    // ========================
    // 6️⃣ Verify OTP and reset password
    // ========================
  // Verify OTP without changing password
@PostMapping("/verify-otp")
public ResponseEntity<String> verifyOtp(@RequestParam String email,
                                        @RequestParam String code) {
    if (otpService.verifyOtp(email, code)) {
        return ResponseEntity.ok("OTP verified ✅");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Invalid or expired OTP ❌");
    }
}

// Reset Password using verified OTP
@PutMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
    String email = payload.get("email");
    String otpCode = payload.get("otp");
    String newPassword = payload.get("newPassword");

    Optional<Otp> otpOpt = otpRepository.findByEmailAndCode(email, otpCode);
    if (otpOpt.isEmpty() || otpOpt.get().getExpiryTime().isBefore(LocalDateTime.now())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Invalid or expired OTP ❌");
    }

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found ❌"));
    user.setPassword(newPassword); // ideally encrypt
    userRepository.save(user);

    // OTP delete after successful reset
    otpRepository.delete(otpOpt.get());

    return ResponseEntity.ok("Password reset successful ✅");
}
}