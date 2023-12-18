"use client";
import { formatDividerNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

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
  const handleSave = () => {};
  const handleVote = (action: string) => {};
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
            onClick={() => {}}
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
              alt="upvotes"
              src={
                hasdownVoted
                  ? "/assets/icons/downvoted.svg"
                  : "/assets/icons/downvote.svg"
              }
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => {}}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatDividerNumber(downvotes)}
              </p>
            </div>
          </div>
        </div>
      </div>
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
        onClick={() => {}}
      />
    </div>
  );
}

export default Voting;
