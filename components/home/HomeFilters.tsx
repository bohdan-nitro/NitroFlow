"use client";
import React, { useState } from "react";
import { HomePageFilters } from "@/constans/filters";
import { Button } from "../ui/button";

interface FilterProps {
  name: string;
  value: string;
}

function HomeFilters() {
  const [active, setActive] = useState("");

  const handleActive = ({ value }: FilterProps): void => {
    setActive(value);
  };

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
          key={item.value}
          onClick={() => handleActive(item)}>
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
