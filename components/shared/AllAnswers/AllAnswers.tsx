import React from "react";
import { getAnwers } from "@/lib/actions/answer.action";
import Filter from "../Filter/Filter";
import { AnswerFilters } from "@/constans/filters";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML/ParseHTML";
import Voting from "../Voting/Voting";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

async function AllAnswers({ questionId, userId, totalAnswers }: Props) {
  const result = await getAnwers({ questionId });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="item-center flex justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  className="flex flex-1 items-start gap-1 sm:items-center"
                  href={`/profile/${answer.author.clerkId}`}>
                  <Image
                    src={answer.author[0].picture}
                    alt="author image"
                    width={16}
                    height={16}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author[0].name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      <span className="ml-1 max-sm:hidden"> -</span>
                      answered {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Voting
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
}

export default AllAnswers;
