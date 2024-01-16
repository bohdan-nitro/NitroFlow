import React from "react";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import { UserFilters } from "@/constans/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/shared/cards/UserCard/UserCard";
import { SearchParamsProps } from "@/types";

async function Community({ searchParams }: SearchParamsProps) {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgSrc={"./assets/icons/search.svg"}
          iconPosition={"left"}
          route={"/community"}
          placeholder={"Search for amazing minds"}
          otherClasses="flex-1"
        />
        <Filter
          otherClasses={"min-h-[56px] sm:min-w[170px]"}
          filters={UserFilters}
        />
      </div>
      <HomeFilters />

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((item) => <UserCard user={item} key={item._id} />)
        ) : (
          <div className="paragraph-regular text-dark200_lighht800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link className="text-accent-blue mt-2 font-bold" href={"/sign-up"}>
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default Community;
