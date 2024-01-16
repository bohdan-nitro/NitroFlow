"use server"
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types"
import { connectToDataBase } from "../mongoose"
import Answer from "@/database/answer.model"
import Question from "@/database/question.model"
import { revalidatePath } from "next/cache"
import Interaction from "@/database/interaction.model"



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
        const {questionId, sortBy} = params;
        let sortOptions = {};

    switch (sortBy){
        case "highestUpvotes":
            sortOptions = {upvotes: -1}
            break;
        case "lowestUpvotes":
            sortOptions = {upvotes: 1}
            break;
        case "old":
            sortOptions = {createdAt: 1}
            break;
        case "recent":
            sortOptions = {createdAt: -1}
            break;
        default:
            break;
    }
        const answers = await Answer.find({question: questionId})
        .populate("author", "_id clerkId picture name")
        .sort(sortOptions)
        return {answers}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getQuestionUpvoteAnswer(params:AnswerVoteParams) {
    try {
        connectToDataBase()
        // Берем нужные параметры из пропсов компонента
        const {answerId, userId, hasdownVoted, hasupVoted, path} = params;
        // Нам нужен изначально пустой обьект для дальнйшей модификации
        let updateQuery = {};

        // Если у нас апвоутс не пустой то мы беремд анные оттуда с этой таблицы
        if(hasupVoted){
            updateQuery = {$pull: {upvotes: userId}}
            // Если у нас давнвотес не пустые мы берем их и дальше пушим наши апвотес
        } else if (hasdownVoted){
            updateQuery = {$pull: {downvotes: userId}, $push: {upvotes: userId}}
            // Если у нас пустота то тогда мы создаем новый обьект в таблице
        } else {
            updateQuery = {$addToSet: {upvotes: userId}}
        }

        // Находим нужный обьект в таблице по айли прокидываем най апдейт обьект и приставка тру дает понять монгодб что нужно создать новый обьект в таблице
        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {new: true})
        if(!answer){
            throw new Error("Answer is not found")
        }
        revalidatePath(path)

    } catch (error) {
        console.log(error)
        throw error
    }
    
}
export async function getQuestionDownvoteAnswer(params:AnswerVoteParams) {
    try {
        connectToDataBase()
        const {answerId, userId, hasdownVoted, hasupVoted, path} = params;
        let updateQuery = {};

        if(hasdownVoted){
            updateQuery = {$pull: {downvotes: userId}}
        } else if (hasupVoted){
            updateQuery = {$pull: {upvotes: userId}, $push: {downvotes: userId}}
        } else {
            updateQuery = {$addToSet: {downvotes: userId}}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {new: true})
        if(!answer){
            throw new Error("Answer is not found")
        }
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function deleteAnswer(params:DeleteAnswerParams) {
    try {
        connectToDataBase() 
        const {answerId, path} = params;
        // Находим ответ по айди
        const answer = await Answer.findById(answerId)
        if(!answer){
            throw new Error("Answer not found")
        }
        // Удаляем ответ по айди
        await Answer.deleteOne({_id: answerId})
        // Обновляем вопросы и ответы связанные с нашим ответайди 
        await Question.updateMany({_id: answer.question}, {$pull: {answers: answerId}})
        
        await Interaction.deleteMany({answer: answerId})
         
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}
