import { URLProps } from "@/types";
import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import Image from "next/image";
import { formatDateWithMonthAndYear2 } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink/ProfileLink";
import Stats from "@/components/shared/Stats/Stats";
import QuestionsTabs from "@/components/shared/tabs/QuestionsTabs";
import AnswersTabs from "@/components/shared/tabs/AnswersTabs";

async function Page({ params, searchParams }: URLProps) {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo.user.picture}
            alt={"user"}
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl={"/assets/icons/portfolio.svg"}
                  href={userInfo.user.portfolioWebsite}
                  title={"Portfolio"}
                />
              )}
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl={"/assets/icons/location.svg"}
                  title={userInfo.user.location}
                />
              )}
              <ProfileLink
                imgUrl={"/assets/icons/calendar.svg"}
                title={formatDateWithMonthAndYear2(userInfo.user.joinedAt)}
              />
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href={"/profile/edit"}>
                <Button className="paragraph-medium text-dark300_light900 btn-secondary min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQeustions={userInfo.totalQeustions}
        totalAnswers={userInfo.totalAnswers}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-post" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger className="tab" value="top-posts">
              Top-posts
            </TabsTrigger>
            <TabsTrigger className="tab" value="answers">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionsTabs
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent className="flex w-full flex-col gap-6" value="answers">
            <AnswersTabs
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Page;
