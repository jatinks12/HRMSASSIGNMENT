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
import { Toaster } from "react-hot-toast";
import { SupabaseClient } from "./Helper/Supabase";
import ApproveLeave from "./Components/leave/ApproveLeave";
import ShowTable from "./Components/leave/ShowTable";
import ShowForm from "./Components/leave/ShowForm";
import { useEffect, useRef, useState } from "react";
import { ProtectedRoute, PublicRoute } from "./Helper/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(
    location.pathname.toLowerCase(),
  );

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // permissions
  const [dashboard, setDashboard] = useState(false);
  const [management, setManagement] = useState(false);
  const [leaveTable, setLeaveTable] = useState(true);
  const [applyLeave, setApplyLeave] = useState(true);
  const [approveLeave, setApproveLeave] = useState(false);
  const [userId, setUserId] = useState("");
  const [deptId, setDeptId] = useState("");
  const [name, setName]  = useState("");
  const [email , setEmail] = useState("");
  async function fetchDetail() {
    const {
      data: { user },
    } = await SupabaseClient.auth.getUser();
    // console.log("fetchDetail start", user);
    try {
      if (!user) {
        console.log("no user");
        setIsAuth(false);
        setLoading(false);
        return;
      }

      setIsAuth(true);

      const { data: profile, error: profileError } = await SupabaseClient.from(
        "profiles",
      )
        .select("*")
        .eq("id", user.id)
        .single();

      // console.log("profile:", profile, "error:", profileError);

      if (profileError || !profile) {
        setLoading(false);
        return;
      }

      const { data: role, error: roleError } = await SupabaseClient.from(
        "roles",
      )
        .select("*")
        .eq("id", profile.role_id)
        .single();

      // console.log("role:", role, "error:", roleError);

      if (roleError || !role) {
        setLoading(false);
        return;
      }
      setName(profile.full_name);
      setEmail(profile.Email);
      setUserId(user.id);
      setDeptId(profile.department_id);
      setDashboard(role.can_view_dashboard);
      setManagement(role.can_view_management);
      setLeaveTable(role.can_view_leave_table);
      setApplyLeave(role.can_apply_leave);
      setApproveLeave(role.can_approve_leave);
      setLoading(false);
      // console.log("fetchDetail done");
    } catch (err) {
      console.error("fetchDetail catch:", err);
      setLoading(false);
    }
  }
  // const resolvedRef = useRef(false);

  useEffect(() => {
    // async function getSession() {
    //   console.log("getSession start");
    //   const { data } = await SupabaseClient.auth.getSession();
    //   console.log("getSession result:", data.session);
    //   if (resolvedRef.current) {
    //     console.log("already resolved, skipping");
    //     return;
    //   }
    //   resolvedRef.current = true;
    //   if (data.session?.user) {
    //     await fetchDetail(data.session.user);
    //   } else {
    //     setIsAuth(false);
    //     setLoading(false);
    //   }
    // }

    // getSession();

    // const { data: listener } = SupabaseClient.auth.onAuthStateChange(
    //   async (event, session) => {
    //     console.log("AUTH EVENT:", event, session);
    //     resolvedRef.current = true;
    //     if (session?.user) {
    //       await fetchDetail(session.user);
    //     } else {
    //       setIsAuth(false);
    //       setDashboard(false);
    //       setManagement(false);
    //       setLeaveTable(false);
    //       setApplyLeave(false);
    //       setApproveLeave(false);
    //       setLoading(false);
    //     }
    //   },
    // );

    // return () => {
    //   listener.subscription.unsubscribe();
    // };
   
    fetchDetail();
  }, [location.pathname]);

  return (
    <>
      {!shouldHideHeader && isAuth && (
        <header className="header">
          <div className="logo">HRMS</div>
          <nav className="nav">
            {dashboard && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/leave">Leave</Link>
            {management && <Link to="/management">Management</Link>}
          </nav>
          <button
            style={{ backgroundColor: "red" }}
            onClick={async () => {
            
              const { error } = await SupabaseClient.auth.signOut();
              if (error) {
                console.log(error);
              } else {
             
                navigate("/login");
              }
            }}
          >
            Logout
          </button>
        </header>
      )}

      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div>Loading...</div>
            ) : isAuth ? (
              dashboard ? (
                <Navigate to="/dashboard" />
              ) : management ? (
                <Navigate to="/management" />
              ) : (
                <Navigate to="/leave" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute
              isAuth={isAuth}
              dashboard={dashboard}
              management={management}
              loading={loading}
            >
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute
              isAuth={isAuth}
              dashboard={dashboard}
              management={management}
              loading={loading}
            >
              <SignUp />
            </PublicRoute>
          }
        />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              loading={loading}
              allowed={dashboard}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute isAuth={isAuth} loading={loading} allowed={true}>
              <Leave
                leaveTable={leaveTable}
                approveLeave={approveLeave}
                applyLeave={applyLeave}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applyleave"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              loading={loading}
              allowed={applyLeave}
            >
              <ShowForm userId={userId} deptId={deptId} name={name} email={email} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/approveleave"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              loading={loading}
              allowed={approveLeave}
            >
              <ApproveLeave   email={email}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leavetable"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              loading={loading}
              allowed={leaveTable}
            >
              <ShowTable email={email}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              loading={loading}
              allowed={management}
            >
              <Management />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
