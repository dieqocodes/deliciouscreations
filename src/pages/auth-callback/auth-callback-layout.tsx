import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function AuthCallbackLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
