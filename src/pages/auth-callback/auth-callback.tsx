import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "../../lib/data";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { user } = useUser();
  const body = {
    id: `${user?.id}`,
    firstName: `${user?.firstName}`,
    lastName: `${user?.lastName}`,
    imageUrl: `${user?.imageUrl}`,
  };

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: () => getAuth(body),
    retry: true,
    retryDelay: 500,
  });

  if (data.success) {
    navigate("/");
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      <h3 className="font-semibold text-xl">Logging you in...</h3>
      <p>You will be redirected automatically.</p>
    </div>
  );
}
