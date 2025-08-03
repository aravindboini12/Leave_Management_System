import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApplyLeave from './Components/ApplyLeave';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import MyLeaves from './Components/MyLeaves';
import Navbar from './Components/Navbar';
import Register from './Components/Register';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/my-leaves" element={<MyLeaves />} />

      </Routes>
    </Router>
  );
}

export default App;
