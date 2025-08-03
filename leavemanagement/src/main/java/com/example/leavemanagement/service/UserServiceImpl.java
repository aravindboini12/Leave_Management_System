package com.example.leavemanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.leavemanagement.model.User;
import com.example.leavemanagement.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User registerUser(User user) {
		return userRepository.save(user);
		
	}
	@Override
	public User loginUser(String email,String password) {
		User existingUser=userRepository.findByEmail(email);
		if(existingUser!=null&& existingUser.getPassword().equals(password)) {
			return existingUser;
		}
		return null;
	}
}
