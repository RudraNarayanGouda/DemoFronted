package com.ticket.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ticket.backend.model.User;
import com.ticket.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // Login endpoint
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User dbUser = userService.getUserByEmail(user.getEmail());

        if (!dbUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        // Hide password before sending response
        dbUser.setPassword(null);

        return dbUser;
    }

    // Get all users
   @GetMapping
public List<User> getAllUsers() {
    List<User> users = userService.getAllUsers();

    // Hide passwords
    users.forEach(u -> u.setPassword(null));

    return users;
}

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        user.setPassword(null); // hide password
        return user;
    }

    // Optional: Create user endpoint
    @PostMapping
    public User createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        newUser.setPassword(null); // hide password
        return newUser;
    }
}