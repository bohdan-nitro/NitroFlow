import React from "react";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import { QuestionFilters } from "@/constans/filters";
import QuestionCard, {
  QuestionProps,
} from "@/components/shared/cards/QuestionCard/QuestionCard";
import Noresult from "@/components/shared/Noresult/Noresult";
import { auth } from "@clerk/nextjs";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgSrc={"./assets/icons/search.svg"}
          iconPosition={"left"}
          route={"/"}
          placeholder={"Search for questions"}
          otherClasses="flex-1"
        />
        <Filter
          otherClasses={"min-h-[56px] sm:min-w[170px]"}
          filters={QuestionFilters}
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map(
            ({
              upvotes,
              author,
              tags,
              _id,
              title,
              answers,
              views,
              createdAt,
            }: QuestionProps) => (
              <QuestionCard
                upvotes={upvotes}
                author={author}
                tags={tags}
                _id={_id}
                title={title}
                key={_id}
                answers={answers}
                views={views}
                createdAt={createdAt}
              />
            )
          )
        ) : (
          <Noresult
            description="You can ask a qustion for the force a future questions card"
            title="There is no saved questions to show"
            link="/ask-question"
            linkTitle="Ask question"
          />
        )}
      </div>
    </>
  );
}

export default Collection;
