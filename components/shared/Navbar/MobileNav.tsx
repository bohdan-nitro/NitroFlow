"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constans";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          item.route === pathName;
        return (
          <SheetClose key={item.route}>
            <Link
              className={`${
                isActive
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
              key={item.label}
              href={item.route}>
              <Image
                className={`${isActive ? "" : "invert-colors"}`}
                width={20}
                height={20}
                alt={item.label}
                src={item.imgURL}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="invert-colors sm:hidden"
          alt="menu"
          height={37}
          width={36}
          src={"./assets/icons/hamburger.svg"}
        />
      </SheetTrigger>
      <SheetContent
        className="background-light900_dark200 border-none"
        side={"left"}>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            width={23}
            height={23}
            alt="DevFlow"
            src={"./assets/images/site-logo.svg"}
          />
          <p className="h2-bold font-spaceGrotesk text-dark100_light900">
            Nitro <span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log in</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Button className="text-dark400_light900 small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
