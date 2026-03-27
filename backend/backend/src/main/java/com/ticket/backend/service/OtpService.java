package com.ticket.backend.service;

import com.ticket.backend.model.Otp;
import com.ticket.backend.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpRepository otpRepository;

    // Send OTP
    public void sendOtp(String email) {
        String otpCode = String.valueOf((int)(Math.random() * 900000) + 100000);

        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setCode(otpCode);
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);  // ✅ Save works if repository & model correct

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otpCode + "\nIt will expire in 5 minutes.");
        mailSender.send(message);
    }

    // Verify OTP (don't delete yet)
    public boolean verifyOtp(String email, String code) {
        Optional<Otp> otpOpt = otpRepository.findByEmailAndCode(email, code);
        if (otpOpt.isPresent() && otpOpt.get().getExpiryTime().isAfter(LocalDateTime.now())) {
            return true;
        }
        return false;
    }

    // Delete OTP only after successful reset
    public void deleteOtp(Otp otp) {
        otpRepository.delete(otp);
    }
}