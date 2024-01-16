"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  isNext: boolean;
}

function Pagination({ page, isNext }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (value: string) => {
    const nextPageNumber = value === "next" ? page + 1 : page - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2">
      <Button
        className="light-border-2 btn flex min-h-[36px] cursor-pointer items-center justify-center gap-2 border"
        onClick={() => handleNavigation("prev")}
        disabled={page === 1}>
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="bg-primary-500 flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{page}</p>
      </div>
      <Button
        className="light-border-2 btn flex min-h-[36px] cursor-pointer items-center justify-center gap-2 border"
        onClick={() => handleNavigation("next")}
        disabled={isNext}>
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
}

export default Pagination;
