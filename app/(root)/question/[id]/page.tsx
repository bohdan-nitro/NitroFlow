import React from "react";
import { getQuestionById } from "@/lib/actions/question.action";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric/Metric";
import { formatDividerNumber, getTimeStamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import RenderTag from "@/components/shared/RenderTag/RenderTag";
import Answer from "@/components/forms/Answer";

async function Question({ params }) {
  const result = await getQuestionById({ questionId: params.id });
  console.log(result, "res");

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={"/"} className="flex items-center justify-start gap-1">
            <Image
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
              src={result?.author[0].picture}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result?.author[0].name}
            </p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` -asked ${getTimeStamp(result.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatDividerNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatDividerNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((item): any => (
          <RenderTag key={item._id} name={item.name} _id={item._id} />
        ))}
      </div>
      <Answer />
    </>
  );
}

export default Question;
