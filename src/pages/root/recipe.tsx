import { Link, useParams } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { useQuery } from "@tanstack/react-query";
import { getUniqueRecipe } from "../../lib/data";
import { Dot, Loader2 } from "lucide-react";

export default function Recipe() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getUniqueRecipe(`${id}`),
  });

  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-1/2 min-h-[10vh] mx-auto flex flex-col gap-8">
        {isLoading ? (
          <div className="w-full h-[20vh] grid place-items-center">
            <Loader2 size={15} className="animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-4xl poppins-semibold">{data?.data?.name}</p>
            <img
              src={data?.data?.imageUrl}
              alt={data?.data?.name}
              className="w-full h-[500px] rounded-xl object-cover"
            />
            <p>
              <span className="poppins-semibold">Category: </span>
              <Link to={`/categories/${data?.data?.category?.toLowerCase()}`}>
                <span className="capitalize underline underline-offset-2">
                  {data?.data?.category}
                </span>
              </Link>
            </p>
            <p>
              <span className="poppins-semibold">Description: </span>
              {data?.data?.description}
            </p>
            <div className="flex flex-col gap-4">
              <p className="poppins-semibold text-2xl">Ingredients</p>
              {data?.data?.ingredients.map((i, index) => (
                <div className="flex" key={index}>
                  <Dot />
                  <p>{i}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <p className="poppins-semibold text-2xl">Instructions</p>
              {data?.data?.instructions.map((i, index) => (
                <p key={index}>
                  {index + 1}. {i}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
