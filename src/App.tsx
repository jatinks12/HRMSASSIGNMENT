import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Leave from "./Components/leave/Leave";
import Management from "./Components/Management/Management";
import "./App.css";
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import toast, { Toaster } from "react-hot-toast";
import { SupabaseClient } from "./Helper/Supabase";
import { useState } from "react";

const App = () => {
  const location = useLocation();
  const navigate=useNavigate();

  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(
    location.pathname.toLowerCase(),
  );

  async function handleLogout(){
    const { error } = await SupabaseClient.auth.signOut()

if (error) {
  toast.error('Error logging out: '+ error.message)
  return;
} else {
  toast.success('User logged out successfully')
}
 navigate("/login");
  }

  const [checkDashboard , setCheckDashboard] = useState(true);
  const [checkleave , setCheckleave] = useState(true);
  const [checkmanagement , setCheckmanagement] = useState(true);

  return (
    <>
      {!shouldHideHeader && (
        <header className="header">
          <div className="logo">HRMS</div>

          <nav className="nav">
          {checkDashboard && <Link to="/dashboard">Dashboard</Link>}
          {checkleave &&  <Link to="/leave">Leave</Link>}
          {checkmanagement && <Link to="/management">Management</Link>}
          </nav>
          <button onClick={()=>handleLogout()}>Logout</button>
        </header>
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login   setCheckDashboard={ setCheckDashboard} setCheckleave={setCheckleave} setCheckmanagement={setCheckmanagement}   />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </>
  );
};

export default App;
