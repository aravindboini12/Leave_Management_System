package com.example.leavemanagement.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable=false)
	private User user;
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	@Column(columnDefinition="TEXT")
	private String reason;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	private LocalDateTime appliedAt;
	
	public enum Status{
		PENDING,
		APPROVED,
		REJECTED
	}

	public LeaveRequest(User user, LocalDate startDate, LocalDate endDate, String reason, Status status,
			LocalDateTime appliedAt, Long id) {
		super();
		this.id = id;
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
		this.reason = reason;
		this.status = status;
		this.appliedAt = appliedAt;
	}
	
	public LeaveRequest(User user, LocalDate startDate, LocalDate endDate, String reason) {
	    this.user = user;
	    this.startDate = startDate;
	    this.endDate = endDate;
	    this.reason = reason;
	    this.appliedAt = LocalDateTime.now();
	    this.status = Status.PENDING;
	}

	public LeaveRequest() {
		super();
		// TODO Auto-generated constructor stub
		this.appliedAt = LocalDateTime.now();
	    this.status = Status.PENDING;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getAppliedAt() {
		return appliedAt;
	}

	public void setAppliedAt(LocalDateTime appliedAt) {
		this.appliedAt = appliedAt;
	}
	
}
