import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

function NavBar() {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 dark:shadow-none sm:px-12">
      {/* Left SIde NavBar */}
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          width={23}
          height={23}
          alt="DevFlow"
          src={"./assets/images/site-logo.svg"}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Nitro <span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <GlobalSearch />
      {/* Right Side NavBar */}
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
}

export default NavBar;
