import Nav from "../../components/nav";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function ProtectedLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
