package com.example.leavemanagement.service;

import java.util.List;
import java.util.Map;

import com.example.leavemanagement.model.LeaveRequest;
import com.example.leavemanagement.model.User;

public interface LeaveRequestService {
	LeaveRequest applyLeave(User user, LeaveRequest leaveRequest);
	List<LeaveRequest> getMyLeaveRequests(User user);
	List<LeaveRequest> getAllLeaveRequests();
	Map<String, Long> getLeaveSummary(Long userId);
	void updateLeaveStatus(Long leaveId, LeaveRequest.Status status);


}
