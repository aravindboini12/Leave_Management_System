import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // clear previous error

    try {
      const response = await api.post(`/users/login`, null, {
        params: { email, password }
      });

      if (response.data) {
        // Save userId in localStorage
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userRole', response.data.role);

        // Go to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleLogin}>
    <div>
      <label>Email:</label><br/>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
    </div>
    <div>
      <label>Password:</label><br/>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
    </div>
    {error && <p style={{color:'red'}}>{error}</p>}
    <button type="submit">Login</button>
  </form>
  <p>Don't have an account? <a href="/register">Register here</a></p>
</div>

  );
}

export default Login;
