package com.example.leavemanagement.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.leavemanagement.model.User;
import com.example.leavemanagement.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return userService.registerUser(user);
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestParam String email, @RequestParam String password) {
        User loggedIn = userService.loginUser(email, password);
        if (loggedIn != null) {
            return loggedIn;
        } else {
            // For now, return null; later you can throw exception or return ResponseEntity
            return null;
        }
    }
}
