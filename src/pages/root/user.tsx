import { Link, useParams } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { useQuery } from "@tanstack/react-query";
import { getUniqueUser } from "../../lib/data";
import { Loader2 } from "lucide-react";

export default function User() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUniqueUser(`${id}`),
  });

  return (
    <MaxWidthWrapper className="py-10 flex flex-col gap-8">
      {isLoading ? (
        <div className="w-full h-[20vh] grid place-items-center">
          <Loader2 size={15} className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="w-full min-h-[20vh] flex items-center gap-4 justify-start">
            <img
              src={data?.data?.imageUrl}
              alt={data?.data?.firstName}
              className="w-[300px] h-[200px] rounded-xl object-cover"
            />
            <p className="poppins-semibold text-2xl">
              {data?.data?.firstName}{" "}
              {data?.data?.lastName !== "null" && data?.data?.lastName}
            </p>
          </div>
          <div className="w-full h-1 bg-gray-100" />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-start">
            {data?.data?.recipes?.map((i) => (
              <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
                <img
                  src={i.imageUrl}
                  alt={i.name}
                  className="w-full h-[200px] rounded-xl object-cover"
                />
                <p className="poppins-semibold mt-4">{i?.name}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
}
