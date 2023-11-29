"use server";
import { connectToDataBase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { GetQuestionsParams, CreateQuestionParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params:GetQuestionsParams) {
    try {
        connectToDataBase()
        const questions = await Question.find({})
        // Почему мы делаем сдесь популейт? Это для того чтобы достать данные из этих частей так как монго дб изначально хранит только ссылки на эти таблицы и если мы хотим вытащить что там внутри то нужно сделать вот так
        .populate({path: "tags", model: Tag})
        .populate({path: "author", model: User})
        .sort({createdAt: -1})

        return {questions}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function AskQuestionAction(params: CreateQuestionParams){
    try {
    connectToDataBase()

    const {title, path, tags, content, author} = params;

    // Создаем Вопрос
    const question = await Question.create({
        title,
        content,
        author
    })
    const tagDocument = [];
    // Создаем теги или берем уже существующие
    for(const tag of tags){
        const existingTag = await Tag.findOneAndUpdate(
            // Эта часть запроса ищет документ с полем name, которое соответствует значению tag. 
            // Используется $regex для регулярного выражения, которое осуществляет поиск с учетом регистра. Знак "^" обозначает начало строки.
            {name: {$regex: new RegExp(`^${tag}$`, "i")}},
            // $setOnInsert: Устанавливает поле name в значение tag только в случае, если операция вставки (upsert) происходит (если не найден существующий тег).
            // $push: Добавляет _id вопроса (question._id) в массив questions. Это предполагает, что в схеме тега есть массив questions, куда добавляются идентификаторы связанных вопросов.
            {$setOnInsert: {name: tag}, $push: {question: question._id}},
            // upsert: true: Если не найден существующий тег, то создает новый с заданными значениями.
            // new: true: Возвращает обновленный документ в результате операции.
            {upsert: true, new: true}
        )
        tagDocument.push(existingTag._id)
    }
    await Question.findByIdAndUpdate(question._id, {
        $push: {tags: {$each: tagDocument}}
    })
    // Это позволяет нам ревалидировать путь и сбросить кеш. если были добавленные новые дарнные то мы их получим
    revalidatePath(path)
    } catch (error) {
        
    }
}