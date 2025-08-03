import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ApplyLeave.css';


function ApplyLeave() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


const navigate = useNavigate();

  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await api.post(`/leaves/apply?userId=${userId}`, {
        startDate,
        endDate,
        reason
      });

      if (response.data) {
        setSuccess('Leave applied successfully!');
        // Optionally redirect to my leaves or dashboard:
        navigate('/my-leaves');
      } else {
        setError('Failed to apply leave');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="apply-container">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleApply}>
        <div>
          <label>Start Date:</label><br/>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label><br/>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reason:</label><br/>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            required
          />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        {success && <p style={{color:'green'}}>{success}</p>}
        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
}

export default ApplyLeave;
