import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../lib/data";
import { Link, useSearchParams } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Loader2 } from "lucide-react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => getSearch(`${q}`),
  });

  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-full h-[15vh] flex justify-between items-center">
        <p className="text-4xl poppins-semibold">Showing results for: {q}</p>
      </div>
      {isLoading ? (
        <div className="w-full h-[20vh] grid place-items-center">
          <Loader2 size={15} className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="poppins-semibold text-base">Users:</p>
          <div className="w-full min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.users?.length !== 0 &&
              data?.data?.users?.map((i) => (
                <Link to={`/users/${i.id}`} key={i.id} className="w-full">
                  <img
                    src={i.imageUrl}
                    alt={i.firstName}
                    className="w-full h-[200px] rounded-xl object-cover"
                  />
                  <p className="poppins-semibold mt-4">
                    {i?.firstName} {i?.lastName !== "null" && i?.lastName}
                  </p>
                </Link>
              ))}
            {data?.data?.users?.length === 0 && (
              <div className="w-full h-[20vh] grid place-items-center col-span-4">
                No results
              </div>
            )}
          </div>
          <p className="poppins-semibold text-base">Recipes:</p>
          <div className="w-full min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.recipes?.length !== 0 &&
              data?.data?.recipes?.map((i) => (
                <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
                  <img
                    src={i.imageUrl}
                    alt={i.name}
                    className="w-full h-[200px] rounded-xl object-cover"
                  />
                  <p className="poppins-semibold mt-4">{i?.name}</p>
                </Link>
              ))}
            {data?.data?.recipes?.length === 0 && (
              <div className="w-full h-[20vh] grid place-items-center col-span-4">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
