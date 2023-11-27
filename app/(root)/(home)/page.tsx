import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import { HomePageFilters } from "@/constans/filters";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/shared/QuestionCard/QuestionCard";
import Noresult from "@/components/shared/Noresult/NOresult";

const questions = [
  {
    _id: 1,
    title: "Cascade deletes in Academy",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "author1",
      name: "Bobby Man",
      pictute: "url/to/picture1",
    },
    upvotes: 1000000,
    views: 33,
    answers: [],
    createdAt: new Date("2023-11-26T17:50:45.370Z"),
  },
  {
    _id: 2,
    title: "How to implement a list of Items",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "react" },
    ],
    author: {
      _id: "author2",
      name: "Bobby Criton",
      pictute: "url/to/picture2",
    },
    upvotes: 15,
    views: 35,
    answers: [],
    createdAt: new Date("2023-10-26T17:50:45.370Z"),
  },
];

function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link className="flex justify-end max-sm:w-full" href={"/ask-question"}>
          <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3">
            Ask a questions
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          imgSrc={"./assets/icons/search.svg"}
          iconPosition={"left"}
          route={"/"}
          placeholder={"Search for questions"}
          otherClasses="flex-1"
        />
        <Filter
          otherClasses={"min-h-[56px] sm:min-w[170px]"}
          containerClasses={"hidden max-md:flex"}
          filters={HomePageFilters}
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((item) => (
            <QuestionCard
              upvotes={item.upvotes}
              author={item.author}
              tags={item.tags}
              _id={item._id}
              title={item.title}
              key={item._id}
              answers={item.answers}
              views={item.views}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <Noresult
            description="You can ask a qustion for the force a future questions card"
            title="There is no questions to show1"
            link="/ask-question"
            linkTitle="Ask question"
          />
        )}
      </div>
    </>
  );
}

export default Home;
