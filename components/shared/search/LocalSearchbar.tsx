"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

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
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [text, setText] = useState(query || "");

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const delayDeboundeFn = setTimeout(() => {
      if (text) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: text,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 400);
    return () => clearTimeout(delayDeboundeFn);
  }, [text, searchParams, router, route, pathName, query]);

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
        value={text}
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
