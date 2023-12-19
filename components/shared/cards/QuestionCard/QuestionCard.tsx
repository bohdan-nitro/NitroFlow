import React from "react";
import Link from "next/link";
import RenderTag from "../../RenderTag/RenderTag";
import Metric from "../../Metric/Metric";
import { getTimeStamp, formatDividerNumber } from "@/lib/utils";

export interface QuestionProps {
  _id: number;
  title: string;
  author: {
    _id: string;
    name: string;
    picture: string;
  }[];
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  tags: {
    _id: string;
    name: string;
  }[];
}

const QuestionCard = ({
  title,
  _id,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  tags,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in todo edit delete actions */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-3">
        {tags.map((item) => (
          <RenderTag name={item.name} key={item._id} _id={item._id} />
        ))}
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
          alt="upvotes"
          value={formatDividerNumber(upvotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatDividerNumber(answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatDividerNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
