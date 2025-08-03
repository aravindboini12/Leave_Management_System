import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import api from '../services/api';
import './Dashboard.css';



function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]); // for admin
  const [error, setError] = useState('');

  const chartData = [
  { name: 'Approved', value: summary?.approved || 0 },
  { name: 'Rejected', value: summary?.rejected || 0 },
  { name: 'Pending', value: (summary?.total || 0) - (summary?.approved || 0) - (summary?.rejected || 0) }
];

const COLORS = ['#4CAF50', '#f44336', '#FF9800']; // green, red, orange

  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  




  useEffect(() => {
    if (!userId) {
      setError('User not logged in');
      return;
    }

    if (userRole === 'ADMIN') {
      // Fetch all leave requests
      api.get('/leaves/admin/all')
        .then(response => {
          setLeaveRequests(response.data);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch leave requests');
        });
    } else {
      // Employee: fetch summary
      api.get(`/leaves/summary?userId=${userId}`)
        .then(response => {
          setSummary(response.data);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch summary data');
        });
    }
  }, [userId, userRole]);

 const handleApprove = (leaveId) => {
  api.post(`/leaves/approve?leaveId=${leaveId}`)
    .then(() => {
      // update UI: refetch list
      setLeaveRequests(prev =>
        prev.map(req =>
          req.id === leaveId ? { ...req, status: 'APPROVED' } : req
        )
      );
    })
    .catch(err => {
      console.error(err);
      alert('Failed to approve leave');
    });
};

const handleReject = (leaveId) => {
  api.post(`/leaves/reject?leaveId=${leaveId}`)
    .then(() => {
      setLeaveRequests(prev =>
        prev.map(req =>
          req.id === leaveId ? { ...req, status: 'REJECTED' } : req
        )
      );
    })
    .catch(err => {
      console.error(err);
      alert('Failed to reject leave');
    });
};


  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (userRole === 'ADMIN') {
    return (
      
  <div style={{ padding: '20px' }}>
    <h2 style={{ marginBottom: '10px' }}>Admin Dashboard</h2>
    <p style={{ marginBottom: '20px' }}>Total leave requests: {leaveRequests.length}</p>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead style={{ backgroundColor: '#f2f2f2' }}>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Start</th>
          <th>End</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map(req => (
          <tr key={req.id} style={{ textAlign: 'center' }}>
            <td>{req.id}</td>
<td>{req.user.id}</td>
<td>{req.startDate}</td>
<td>{req.endDate}</td>
<td>{req.reason}</td>
<td>{req.status}</td>
<td>
  <button
    onClick={() => handleApprove(req.id)}
    disabled={req.status !== 'PENDING'}
    className={`btn-approve ${req.status !== 'PENDING' ? 'btn-disabled' : ''}`}
  >
    Approve
  </button>
  <button
    onClick={() => handleReject(req.id)}
    disabled={req.status !== 'PENDING'}
    className={`btn-reject ${req.status !== 'PENDING' ? 'btn-disabled' : ''}`}
  >
    Reject
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
  }

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Leave Status Chart</h3>
<ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={chartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>

{/* summary cards below */}
<div className="summary-cards">
  <div className="summary-card">
    <h4>Total Leaves Applied</h4>
    <p>{summary.total}</p>
  </div>
  <div className="summary-card">
    <h4>Approved Leaves</h4>
    <p>{summary.approved}</p>
  </div>
  <div className="summary-card">
    <h4>Rejected Leaves</h4>
    <p>{summary.rejected}</p>
  </div>
</div>

      </div>
    </div>
  );
}

export default Dashboard;
