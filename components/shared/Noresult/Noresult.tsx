import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NoResulProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

function Noresult({ title, description, link, linkTitle }: NoResulProps) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        alt="No illustartion"
        src={"/assets/images/light-illustration.png"}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        alt="No illustartion"
        src={"/assets/images/dark-illustration.png"}
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium bg-primary-500 px4 py3 text-light-900 hover:bg-primary-400 dark:bg-primary-400 dark:text-light-900 mt-5 min-h-[46px] rounded-lg">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
}

export default Noresult;
