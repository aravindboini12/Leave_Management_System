package com.example.leavemanagement.service;

import com.example.leavemanagement.model.User;

public interface UserService {
	User registerUser(User user);
	User loginUser(String email, String password);
}
