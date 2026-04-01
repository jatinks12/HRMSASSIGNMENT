import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Leave from "./Components/leave/Leave";
import Management from "./Components/Management/Management";
import "./App.css";
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(
    location.pathname.toLowerCase(),
  );

  return (
    <>
      {!shouldHideHeader && (
        <header className="header">
          <div className="logo">HRMS</div>

          <nav className="nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/leave">Leave</Link>
            <Link to="/management">Management</Link>
          </nav>
        </header>
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </>
  );
};

export default App;
