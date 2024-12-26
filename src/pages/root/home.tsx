import { Users, BookOpen, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import SearchForm from "../../components/search-form";
import MaxWidthWrapper from "../../components/max-width-wrapper";

export default function LandingPage() {
  return (
    <MaxWidthWrapper className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="max-w-[900px] mx-auto text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Share Your Culinary Creations with the World
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Delicious is the ultimate platform for food lovers to
                  discover, share, and celebrate recipes from around the globe.
                </p>
              </div>
              <SearchForm />
              <div className="space-x-4">
                <button className="bg-black text-white">
                  <Link to="/sign-in">Get Started</Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Delicious?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Connect with Food Lovers</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Join a vibrant community of passionate cooks and food
                  enthusiasts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Discover New Recipes</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Explore a vast collection of recipes from various cuisines and
                  skill levels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Share2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Share Your Creations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Showcase your culinary skills and inspire others with your
                  unique recipes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="signup" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Delicious Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start your culinary journey with Delicious. Sign up now to
                  create, share, and explore delicious recipes from around the
                  world.
                </p>
              </div>
              <button className="bg-black text-white">
                <Link to="/sign-up">Sign Up for Free</Link>
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Delicious. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </MaxWidthWrapper>
  );
}
