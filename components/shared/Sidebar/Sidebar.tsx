"use client";
import React from "react";
import Link from "next/link";
import { sidebarLinks } from "@/constans";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathName = usePathname();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between overflow-y-auto border-r p-6 pt-36 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            item.route === pathName;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900 flex  items-center justify-start gap-4 rounded-lg bg-transparent p-4"
                  : "text-dark300_light900  flex items-center justify-start gap-4 bg-transparent p-4"
              }`}>
              <Image
                className={`${isActive ? "" : "invert-colors"}`}
                width={20}
                height={20}
                alt={item.label}
                src={item.imgURL}
              />
              <p
                className={`${
                  isActive
                    ? "base-bold max-lg:hidden"
                    : "base-medium max-lg:hidden"
                }`}>
                {item.label}
              </p>
            </Link>
          );
        })}
        <div>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <Link href={"/sign-in"}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image
                    className="invert-colors lg:hidden"
                    width={20}
                    height={20}
                    alt="login"
                    src={"./assets/icons/account.svg"}
                  />
                  <span className="primary-text-gradient max-lg:hidden">
                    Log in
                  </span>
                </Button>
              </Link>

              <Link href={"/sign-up"}>
                <Button className="text-dark400_light900 small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image
                    className="invert-colors lg:hidden"
                    width={20}
                    height={20}
                    alt="sign-up"
                    src={"./assets/icons/sign-up.svg"}
                  />
                  <span className="max-lg:hidden">Sign up</span>
                </Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
