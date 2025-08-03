import { useEffect, useState } from 'react';
import api from '../services/api';
import './MyLeaves.css';


function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      return;
    }

    api.get(`/leaves/my-requests?userId=${userId}`)
      .then(response => {
        setLeaves(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch leave requests');
      });
  }, []);

  if (error) {
    return <p style={{color:'red'}}>{error}</p>;
  }

  if (!leaves.length) {
    return <p>No leave requests found.</p>;
  }

  return (
    <div className="myleaves-container">
      <h2>My Leave Requests</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(req => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.startDate}</td>
              <td>{req.endDate}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>{req.appliedAt?.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyLeaves;
