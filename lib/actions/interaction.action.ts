"use server"
import Question from "@/database/question.model";
import { connectToDataBase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";


export async function viewQuestion(params: ViewQuestionParams) {
    try {
       connectToDataBase();
        const {questionId, userId} = params;
        // Нам нужно сделать апдейт вопроса если мы его просмотрели
        await Question.findByIdAndUpdate(questionId, {$inc: {views: 1}})
        // Теперь проверим просматривал ли ранее юзер вопрос
        if(userId){
            const existInteraction = await Interaction.findOne({
                user: userId,
                action: "view",
                question: questionId
            })
            if(existInteraction){
                console.log("User allready viewed this question")
                return
            }
            // Если не просмотрел юзер вопрос то тогда создаем экшн для создания просмотра вопроса
            await Interaction.create({
                user: userId,
                action: "view",
                question: questionId
            })
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}