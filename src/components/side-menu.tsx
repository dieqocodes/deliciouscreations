import { useSideMenuStore } from "../store/sideMenuStore";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../constants";
import MaxWidthWrapper from "./max-width-wrapper";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";

export default function SideMenu() {
  const { initial, handleInitial } = useSideMenuStore();

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: initial ? "100%" : 0 }}
      className="md:hidden bg-white fixed top-0 right-0 h-full pt-20"
    >
      <MaxWidthWrapper className="flex flex-col">
        {NAV_LINKS.map((i) => (
          <Link to={i.href} key={i.id} onClick={handleInitial}>
            <div className="flex items-center gap-2 border-b py-8">
              <p className="text-2xl poppins-semibold">{i.label}</p>
            </div>
          </Link>
        ))}
        <SignedIn>
          <Link to="/profile" onClick={handleInitial}>
            <div className="flex items-center gap-2 border-b py-8">
              <p className="text-2xl poppins-semibold">Profile</p>
            </div>
          </Link>
          <SignOutButton>
            <button className="w-full p-4 bg-red-400 mt-8 text-white">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in" onClick={handleInitial}>
            <div className="flex items-center gap-2 border-b py-8">
              <p className="text-2xl poppins-semibold">Sign In</p>
            </div>
          </Link>
          <Link to="/sign-up">
            <button className="w-full p-4 bg-black text-white mt-8">
              Get Started
            </button>
          </Link>
        </SignedOut>
      </MaxWidthWrapper>
    </motion.div>
  );
}
