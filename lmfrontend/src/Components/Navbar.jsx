import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
  <Link to="/dashboard">Dashboard</Link>
  {userRole !== 'ADMIN' && (
    <>
      <Link to="/apply-leave">Apply Leave</Link>
      <Link to="/my-leaves">My Leaves</Link>
    </>
  )}
  <button onClick={handleLogout}>Logout</button>
</nav>

  );
}

export default Navbar;
