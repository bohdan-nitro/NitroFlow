import * as z from "zod";

// Validation schema with Zod library

export const QuestionsSchema = z.object({
    title: z.string().min(5).max(130),
    explanation: z.string().min(100),
    // minimum 1 tag and maximum a 3 tags and each tag should be at least 1 character and max is 15
    tags: z.array(z.string().min(1).max(15)).min(1).max(3)
  });

  export const AnswerSchema = z.object({
    answer: z.string().min(100)
  })