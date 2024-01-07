import React from "react";
import { formatDividerNumber } from "@/lib/utils";
import Image from "next/image";

interface StatsProps {
  totalAnswers: number;
  totalQeustions: number;
}

interface StatCardProps {
  imgUrl: string;
  title: string;
  value: number;
}

const StatsCard = ({ imgUrl, title, value }: StatCardProps) => {
  return (
    <div className="light-border background-light800_dark300 border-p-6 shadow-light-300 dark:shadow-dark-200 flex flex-wrap items-center justify-start gap-4 rounded-md">
      <Image alt={title} src={imgUrl} width={30} height={40} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

function Stats({ totalAnswers, totalQeustions }: StatsProps) {
  console.log(totalQeustions);
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>
      <div className="xs:grid-cols-2 mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="light-border background-light800_dark300 border-p-6 shadow-light-300 dark:shadow-dark-200 flex flex-wrap items-center justify-evenly gap-4 rounded-md">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalQeustions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl={"/assets/icons/gold-medal.svg"}
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl={"/assets/icons/silver-medal.svg"}
          value={0}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl={"/assets/icons/bronze-medal.svg"}
          value={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
}

export default Stats;
