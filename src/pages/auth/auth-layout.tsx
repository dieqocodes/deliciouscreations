import { ArrowLeft } from "lucide-react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full relative">
        <Link to="..">
          <div className="absolute top-10 left-10 flex items-center gap-1 text-white">
            <ArrowLeft size={15} />
            Back
          </div>
        </Link>
        <img
          src="https://images.pexels.com/photos/1510690/pexels-photo-1510690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="croissant"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 h-full grid place-items-center">
        <Outlet />
      </div>
    </div>
  );
}
