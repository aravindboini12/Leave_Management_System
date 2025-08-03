package com.example.leavemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.leavemanagement.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
