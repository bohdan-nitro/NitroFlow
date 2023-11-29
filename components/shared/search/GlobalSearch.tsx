"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

function GlobalSearch() {
  const [text, setText] = useState("");
  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className="relative flex w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          className="cursor-pointer"
          alt="search"
          width={24}
          height={24}
          src={"./assets/icons/search.svg"}
        />
        <Input
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
          value={text}
          onChange={handleText}
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default GlobalSearch;
