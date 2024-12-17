import { Routes, Route } from "react-router-dom";
import {
  Home,
  Recipes,
  Recipe,
  Category,
  Users,
  User,
  Search,
  RootLayout,
} from "./pages/root";
import { AuthLayout, SignInPage, SignUpPage } from "./pages/auth";
import { AuthCallbackLayout, AuthCallback } from "./pages/auth-callback";
import { ProtectedLayout, Post, Profile } from "./pages/protected";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<AuthCallbackLayout />}>
          <Route path="/auth-callback" element={<AuthCallback />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/post" element={<Post />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
