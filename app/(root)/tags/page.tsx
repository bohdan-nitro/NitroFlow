import React from "react";
import HomeFilters from "@/components/home/HomeFilters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import { TagFilters } from "@/constans/filters";
import Noresult from "@/components/shared/Noresult/Noresult";
import { getAllTags } from "@/lib/actions/tag.action";
import TagsCard from "@/components/shared/cards/TagsCard/TagsCard";
import { SearchParamsProps } from "@/types";

async function Tags({ searchParams }: SearchParamsProps) {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgSrc={"./assets/icons/search.svg"}
          iconPosition={"left"}
          route={"/tags"}
          placeholder={"Search for tags"}
          otherClasses="flex-1"
        />
        <Filter
          otherClasses={"min-h-[56px] sm:min-w[170px]"}
          filters={TagFilters}
        />
      </div>
      <HomeFilters />

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tags) => <TagsCard tags={tags} key={tags._id} />)
        ) : (
          <div className="paragraph-regular text-dark200_lighht800 mx-auto max-w-4xl text-center">
            <Noresult
              linkTitle="Ask a question"
              link="/ask-question"
              description="Seems like we dont have any tags yet"
              title="No tags found"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Tags;
