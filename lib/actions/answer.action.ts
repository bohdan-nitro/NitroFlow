"use server"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types"
import { connectToDataBase } from "../mongoose"
import Answer from "@/database/answer.model"
import User from "@/database/user.model"
import Question from "@/database/question.model"
import { revalidatePath } from "next/cache"



export async function createAnswer(params:CreateAnswerParams) {
    try {
        connectToDataBase()
        const {content, author, question, path} = params;
        const newAnswer = await Answer.create({content, question, path, author})
        await Question.findByIdAndUpdate(question, {
            $push: {answers: newAnswer._id}
        })
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getAnwers(params:GetAnswersParams) {
    try {
        connectToDataBase()
        const {questionId} = params;
        const answers = await Answer.find({question: questionId})
        .populate("author", "_id clerkId picture name")
        .sort({createdAt: -1})
        return {answers}
    } catch (error) {
        console.log(error)
        throw error
    }
}