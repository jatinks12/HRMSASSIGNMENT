import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Leave from "./Components/leave/Leave";
import Management from "./Components/Management/Management";
import "./App.css";
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import toast, { Toaster } from "react-hot-toast";
import { SupabaseClient } from "./Helper/Supabase";
import { useEffect, useState } from "react";
import { applyRolePermissions } from "./Helper/roles";
import { ProtectedRoute,PublicOnlyRoute } from "./Helper/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(
    location.pathname.toLowerCase(),
  );


  const [checkDashboard, setCheckDashboard] = useState(false);
  const [checkleave, setCheckleave] = useState(false);
  const [checkmanagement, setCheckmanagement] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const fallbackPath = checkmanagement?"/management":checkDashboard?"/dashboard":"/leave";

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await SupabaseClient.auth.getSession();

      if (data.session?.user) {
        applyRolePermissions({
          userId: data.session.user.id,
          setCheckDashboard,
          setCheckleave,
          setCheckmanagement,
          setUserId,
        });
      }
      setLoading(false);
    };
    loadSession();
  }, []);


  
  async function handleLogout() {
    const { error } = await SupabaseClient.auth.signOut();

    if (error) {
      toast.error("Error logging out: " + error.message);
      return;
    } 

      setCheckDashboard(false);
      setCheckleave(false);
      setCheckmanagement(false);
      setUserId("");
      toast.success("User logged out successfully");
      navigate("/login");
  }

  if (loading) return <div>Loading...</div>; 
  return (
    <>
      {!shouldHideHeader && (
        <header className="header">
          <div className="logo">HRMS</div>

          <nav className="nav">
            {checkDashboard && <Link to="/dashboard">Dashboard</Link>}
            {checkleave && <Link to="/leave">Leave</Link>}
            {checkmanagement && <Link to="/management">Management</Link>}
          </nav>
          <button onClick={() => handleLogout()}>Logout</button>
        </header>
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute userId={userId}  fallbackPath={fallbackPath}>
            <Login
              setCheckDashboard={setCheckDashboard}
              setCheckleave={setCheckleave}
              setCheckmanagement={setCheckmanagement}
              setUserId={setUserId}
            />
            </PublicOnlyRoute>
          }
        />
        <Route path="/signup" element={ <PublicOnlyRoute userId={userId}  fallbackPath={fallbackPath}><SignUp /></PublicOnlyRoute>} />
        <Route path="/dashboard" element={ <ProtectedRoute userId={userId}   hasAccess={checkDashboard} fallbackPath={fallbackPath}><Dashboard /></ProtectedRoute>} />
        <Route path="/leave" element={<ProtectedRoute userId={userId} hasAccess={checkleave} fallbackPath={fallbackPath}><Leave userId={userId} /> </ProtectedRoute>} />
        <Route path="/management" element={<ProtectedRoute userId={userId} hasAccess={checkmanagement} fallbackPath={fallbackPath}><Management /> </ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
