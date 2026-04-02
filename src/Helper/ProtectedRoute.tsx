import { Navigate } from "react-router-dom";


interface Protectedprops{
  children:React.ReactNode;
  userId:string;
  hasAccess:boolean;
  fallbackPath:string;
}

interface publicprops{
  children:React.ReactNode;
  userId:string;
  fallbackPath:string;
}
export function ProtectedRoute({children , userId , hasAccess , fallbackPath}:Protectedprops){
   if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyRoute({children , userId ,fallbackPath}:publicprops){
  if (userId) {
    return <Navigate to={fallbackPath} replace />;
  }
  return <>{children}</>;
}