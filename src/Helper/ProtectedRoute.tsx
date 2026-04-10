import { Navigate, useLocation} from "react-router-dom";

interface props1 {
  children: any;
  isAuth: boolean;
  loading: boolean;
  allowed: boolean;
}
export function ProtectedRoute({ children , isAuth , loading, allowed}: props1) {
const location = useLocation();
 if (loading) {
    return <div>Loading...</div>;
  }
 if(!isAuth){
  console.log("finding in pr ", allowed );
  return <Navigate to="/login" replace state={{from:location}}/>
 }
    
 if(!allowed){
  const froms = location.state?.from?.pathname || "/leave";
  console.log(froms);
  return <Navigate to={froms} replace/>
 }
 
  return children;
}

// public route
interface props {
  children: any;
  isAuth: boolean;
  dashboard: boolean;
  management: boolean;
  loading: boolean;
}

export function PublicRoute({
  children,
  isAuth,
  dashboard,
  management,
  loading,
}: props) {
  
  if (loading) {
   
    return <div>Loading...</div>;
  }
  if (isAuth) {
    console.log("in isAuth");
    if (dashboard) {
      return <Navigate to="/dashboard" replace />;
    } else if (management) {
      return <Navigate to="/management" replace />;
    } else {
      return <Navigate to="/leave" replace />;
    }
  }
  console.log("children is back" , children);
  return children;
}
