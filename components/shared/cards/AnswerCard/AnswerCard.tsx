import React from "react";
import Link from "next/link";
import { getTimeStamp, formatDividerNumber } from "@/lib/utils";
import Metric from "../../Metric/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../../EditDeleteAction/EditDeleteAction";

export interface AnswerProps {
  _id: number;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  }[];
  upvotes: number;
  question: any;
  createdAt: Date;
  clerkId?: string;
}

function AnswerCard({
  _id,
  author,
  upvotes,
  question,
  createdAt,
  clerkId,
}: AnswerProps) {
  const showActionBtns = clerkId && clerkId === author[0].clerkId;
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9">
      <Link href={`/question/${question[0]?._id}/#${_id}`}>
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimeStamp(createdAt)}
            </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question[0]?.title}
            </h3>
          </div>
          <SignedIn>
            {showActionBtns && (
              <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>
        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author[0].picture}
            alt="user"
            value={author[0].name}
            title={`- Asked ${getTimeStamp(createdAt)}`}
            textStyles="body-medoum text-dark400_light700"
            href={`/profile/${author[0]._id}`}
            isAuthor
          />
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatDividerNumber(upvotes)}
            title=" Likes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </Link>
    </div>
  );
}

export default AnswerCard;
