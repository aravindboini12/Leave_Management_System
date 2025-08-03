package com.example.leavemanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.leavemanagement.model.LeaveRequest;
import com.example.leavemanagement.model.User;
import com.example.leavemanagement.repositories.UserRepository;
import com.example.leavemanagement.service.LeaveRequestService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {
	
	@Autowired
	private LeaveRequestService leaveRequestService;
	@Autowired
	private UserRepository userRepository;
	
	
	
	
	@PostMapping("/apply")
	public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest, @RequestParam Long userId) {
		//TODO: process POST request
		User user = userRepository.findById(userId).orElse(null);
	    if (user == null) {
	        throw new RuntimeException("User not found");
	    }
	    return leaveRequestService.applyLeave(user, leaveRequest);
	}
	
	@GetMapping("/my-requests")
    public List<LeaveRequest> getMyLeaveRequests(@RequestParam Long userId) {
        User user = new User();
        user.setId(userId);
        return leaveRequestService.getMyLeaveRequests(user);
    }
	
	@GetMapping("/admin/all")
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }
	
	@GetMapping("/summary")
	public Map<String, Long> getLeaveSummary(@RequestParam Long userId) {
	    return leaveRequestService.getLeaveSummary(userId);
	}
	
	@PostMapping("/approve")
	public void approveLeave(@RequestParam Long leaveId) {
	    leaveRequestService.updateLeaveStatus(leaveId, LeaveRequest.Status.APPROVED);
	}

	@PostMapping("/reject")
	public void rejectLeave(@RequestParam Long leaveId) {
	    leaveRequestService.updateLeaveStatus(leaveId, LeaveRequest.Status.REJECTED);
	}

	
	
}
