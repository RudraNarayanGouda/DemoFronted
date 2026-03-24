package com.ticket.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticket.backend.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find user by email
    Optional<User> findByEmail(String email);
}