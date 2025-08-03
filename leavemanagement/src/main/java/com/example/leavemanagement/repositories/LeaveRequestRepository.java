package com.example.leavemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.leavemanagement.model.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
	long countByUserId(Long userId);
	long countByUserIdAndStatus(Long userId, LeaveRequest.Status status);

}
