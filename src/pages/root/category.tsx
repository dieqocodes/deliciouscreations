import { Link, useParams } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByCategory } from "../../lib/data";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function Category() {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getRecipesByCategory(`${id}`),
  });

  const filter = data?.data?.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-full h-[15vh] flex justify-between items-center">
        <p className="text-4xl poppins-semibold capitalize">{id}</p>
        <div className="w-[400px] flex gap-2 items-center bg-gray-100 px-8 py-4 rounded-full">
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
          <Loader2 size={15} className="animate-spin" />
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