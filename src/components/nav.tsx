import MaxWidthWrapper from "./max-width-wrapper";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { ArrowRight, Menu, User, X } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { cn } from "../lib/utils";
import { useSideMenuStore } from "../store/sideMenuStore";
import SideMenu from "./side-menu";

export default function Nav() {
  const location = useLocation();
  const { initial, handleInitial } = useSideMenuStore();

  return (
    <div className="w-full h-20 border-b sticky top-0 bg-white z-50">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link to="/">
          <p className="lobster-regular text-4xl">delicious</p>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((i) => (
            <Link to={i.href} key={i.id}>
              <div className="flex items-center gap-1">
                <i.icon
                  size={15}
                  className={cn(
                    location.pathname === i.href ? "text-red-400" : ""
                  )}
                />
                <p>{i.label}</p>
              </div>
            </Link>
          ))}
          <SignedIn>
            <Link to="/profile">
              <div className="flex items-center gap-1">
                <User
                  size={15}
                  className={cn(
                    location.pathname === "/profile" ? "text-red-400" : ""
                  )}
                />
                <p>Profile</p>
              </div>
            </Link>
            <SignOutButton>
              <button className="px-4 py-2 bg-red-400 text-white">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">
              <p>Sign In</p>
            </Link>
            <Link to="/sign-up">
              <button className="bg-black text-white flex items-center gap-1">
                Get Started <ArrowRight size={15} type="button" />
              </button>
            </Link>
          </SignedOut>
        </nav>
        <button
          className="md:hidden p-2 bg-black text-white relative z-50"
          onClick={handleInitial}
        >
          {initial ? <X size={15} /> : <Menu size={15} />}
        </button>
      </MaxWidthWrapper>
      <SideMenu />
    </div>
  );
}
