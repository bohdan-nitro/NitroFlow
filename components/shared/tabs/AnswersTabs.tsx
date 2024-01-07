import { SearchParamsProps } from "@/types";
import React from "react";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

async function AnswersTabs({ searchParams, userId, clerkId }: Props) {
  const result = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          author={item.author}
          upvotes={item.upvotes.length}
          question={item.question}
          createdAt={item.createdAt}
          _id={item._id}
          clerkId={clerkId}
          key={item._id}
        />
      ))}
    </>
  );
}

export default AnswersTabs;
