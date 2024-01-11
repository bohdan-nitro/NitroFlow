import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag/RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";

async function RightSidebar() {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getHotTags();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((item) => (
            <Link
              className="flex cursor-pointer items-center justify-between gap-7"
              key={item._id}
              href={`/question/${item._id}`}>
              <p className="body-medium text-dark500_light700">{item.title}</p>
              <Image
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
                src={"./assets/icons/chevron-right.svg"}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((item) => (
            <RenderTag
              totalQuestions={item.numberOfQuestions}
              name={item.name}
              _id={item._id}
              key={item._id}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
