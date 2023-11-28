import React from "react";
import Question from "@/components/forms/Question";

function AskQuestion() {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
}

export default AskQuestion;
