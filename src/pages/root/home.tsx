import SearchForm from "../../components/search-form";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../lib/data";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import MaxWidthWrapper from "../../components/max-width-wrapper";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-recipes"],
    queryFn: getAllRecipes,
  });

  return (
    <MaxWidthWrapper className="w-full min-h-[90vh] flex flex-col gap-10 items-center justify-center py-10 md:py-0">
      <p className="text-4xl md:text-7xl poppins-semibold text-center leading-tight">
        Find or create your <br className="md:hidden" />
        perfect <br className="hidden md:inline" />
        recipe book
      </p>
      <SearchForm />
      <div
        className={cn(
          "w-full min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        )}
      >
        {isLoading ? (
          <div className="col-span-4 h-[200px] grid place-items-center">
            <Loader2 size={15} className="animate-spin" />
          </div>
        ) : (
          data?.data?.map((i) => (
            <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
              <img
                src={i.imageUrl}
                alt={i.name}
                className="w-full h-[200px] rounded-xl object-cover"
              />
            </Link>
          ))
        )}
      </div>
    </MaxWidthWrapper>
  );
}
