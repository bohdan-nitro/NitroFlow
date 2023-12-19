"use client";
import { formatDividerNumber } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  getQuestionUpvote,
  getQuestionDownvote,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import {
  getQuestionUpvoteAnswer,
  getQuestionDownvoteAnswer,
} from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { viewQuestion } from "@/lib/actions/interaction.action";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasSaved?: boolean;
  hasdownVoted: boolean;
}

function Voting({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: Props) {
  const pathname = usePathname();

  const handleSave = async () => {
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }
    if (action === "upvote") {
      if (type === "Question") {
        await getQuestionUpvote({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await getQuestionUpvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
    }
    if (action === "downvote") {
      if (type === "Question") {
        await getQuestionDownvote({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await getQuestionDownvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            alt="upvotes"
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatDividerNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-2.5">
          <div className="flex-center gap-1.5">
            <Image
              alt="downvote"
              src={
                hasdownVoted
                  ? "/assets/icons/downvoted.svg"
                  : "/assets/icons/downvote.svg"
              }
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => handleVote("downvote")}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatDividerNumber(downvotes)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          alt="star"
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
}

export default Voting;
