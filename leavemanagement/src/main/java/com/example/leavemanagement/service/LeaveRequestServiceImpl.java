package com.example.leavemanagement.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.leavemanagement.model.LeaveRequest;
import com.example.leavemanagement.model.User;
import com.example.leavemanagement.repositories.LeaveRequestRepository;

import jakarta.transaction.Transactional;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {
	
	@Autowired
	private LeaveRequestRepository leaveRequestRepository;
	
	@Override
	public LeaveRequest applyLeave(User user, LeaveRequest leaveRequest) {
		// TODO Auto-generated method stub
		
		leaveRequest.setUser(user);
		leaveRequest.setStatus(LeaveRequest.Status.PENDING);
		leaveRequest.setAppliedAt(java.time.LocalDateTime.now());
		return leaveRequestRepository.save(leaveRequest);
	}

	@Override
	public List<LeaveRequest> getMyLeaveRequests(User user) {
		// TODO Auto-generated method stub
		List<LeaveRequest> allRequests=leaveRequestRepository.findAll();
		return allRequests.stream()
				.filter(req ->req.getUser().getId().equals(user.getId()))
				.toList();
	}

	@Override
	public List<LeaveRequest> getAllLeaveRequests() {
		// TODO Auto-generated method stub
		return leaveRequestRepository.findAll();
	}
	
	@Override
	public Map<String, Long> getLeaveSummary(Long userId) {
	    long total = leaveRequestRepository.countByUserId(userId);
	    long approved = leaveRequestRepository.countByUserIdAndStatus(userId, LeaveRequest.Status.APPROVED);
	    long rejected = leaveRequestRepository.countByUserIdAndStatus(userId, LeaveRequest.Status.REJECTED);

	    Map<String, Long> summary = new HashMap<>();
	    summary.put("total", total);
	    summary.put("approved", approved);
	    summary.put("rejected", rejected);
	    return summary;
	}
	
	@Override
	@Transactional
	public void updateLeaveStatus(Long leaveId, LeaveRequest.Status status) {
	    LeaveRequest request = leaveRequestRepository.findById(leaveId)
	        .orElseThrow(() -> new RuntimeException("Leave request not found"));
	    request.setStatus(status);
	    leaveRequestRepository.save(request);
	}


}
