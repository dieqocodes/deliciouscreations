import { Loader2, Search } from "lucide-react";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../lib/data";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export default function Recipes() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const filter = data?.data?.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <MaxWidthWrapper className="flex flex-col gap-4 py-10">
      <div className="w-full h-[15vh] flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-8 md:gap-0">
        <p className="text-4xl poppins-semibold">Recipes</p>
        <div className="w-full md:w-[400px] flex gap-2 items-center bg-gray-100 px-8 py-4 rounded-full">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="grow outline-none bg-transparent"
          />
        </div>
      </div>
      <div
        className={cn(
          "w-full min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
          isLoading ? "place-items-center" : "place-items-start"
        )}
      >
        {isLoading ? (
          <div className="col-span-4 grid place-items-center h-[200px]">
            <Loader2 size={15} className="animate-spin" />
          </div>
        ) : (
          filter?.map((i) => (
            <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
              <img
                src={i.imageUrl}
                alt={i.name}
                className="w-full h-[200px] rounded-xl object-cover"
              />
              <p className="poppins-semibold mt-4">{i?.name}</p>
            </Link>
          ))
        )}
      </div>
    </MaxWidthWrapper>
  );
}
