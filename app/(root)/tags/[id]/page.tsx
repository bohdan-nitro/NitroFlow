import React from "react";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import QuestionCard, {
  QuestionProps,
} from "@/components/shared/cards/QuestionCard/QuestionCard";
import Noresult from "@/components/shared/Noresult/Noresult";
import { URLProps } from "@/types";

async function Page({ params, searchParams }: URLProps) {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          imgSrc={"./assets/icons/search.svg"}
          iconPosition={"left"}
          route={`/tags/${params.id}`}
          placeholder={"Search for tag questions"}
          otherClasses="flex-1"
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
            title="There is no tag questions to show"
            link="/ask-question"
            linkTitle="Ask question"
          />
        )}
      </div>
    </>
  );
}

export default Page;
