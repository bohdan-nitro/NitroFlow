import React from "react";
import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard/QuestionCard";
import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}
async function QuestionsTabs({ userId, clerkId, searchParams }: Props) {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {result.questions.map((item) => (
        <QuestionCard
          upvotes={item.upvotes}
          author={item.author}
          clerkId={clerkId}
          tags={item.tags}
          _id={item._id}
          title={item.title}
          key={item._id}
          answers={item.answers}
          views={item.views}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
}

export default QuestionsTabs;
