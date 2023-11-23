"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constans";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 data-[state=open]:bg-dark-200:">
          {mode === "light" ? (
            <Image
              alt="sun"
              height={20}
              width={20}
              className="active-theme"
              src="./assets/icons/sun.svg"
            />
          ) : (
            <Image
              alt="moon"
              height={20}
              width={20}
              className="active-theme"
              src="./assets/icons/moon.svg"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="dark:border-dark-400 dark:bg-dark-300 absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2">
          {themes.map((item) => (
            <MenubarItem
              className="dark:focus:bg-dark-400 flex items-center gap-4 px-2.5 py-2"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              key={item.value}>
              <Image
                className={mode === item.value ? "active-theme" : ""}
                width={16}
                height={16}
                alt={item.value}
                src={item.icon}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}>
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
