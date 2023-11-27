import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  totalQuestions?: number;
  name: string;
  showCount?: boolean;
}

function RenderTag({ _id, totalQuestions, name, showCount }: Props) {
  return (
    <Link
      className="flex items-center justify-between gap-2"
      href={`/tags/${_id}`}>
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
}

export default RenderTag;
