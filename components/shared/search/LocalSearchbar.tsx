"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface SearchProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

function LocalSearchbar({
  route,
  iconPosition,
  imgSrc,
  otherClasses,
  placeholder,
}: SearchProps) {
  const [text, setText] = useState("");
  const handleText = (event) => {
    setText(event.target.value);
  };
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
      {iconPosition === "left" && (
        <Image
          className="cursor-pointer"
          width={24}
          height={24}
          src={imgSrc}
          alt="search icon"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={""}
        onChange={handleText}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          className="cursor-pointer"
          width={24}
          height={24}
          src={imgSrc}
          alt="search icon"
        />
      )}
    </div>
  );
}

export default LocalSearchbar;
