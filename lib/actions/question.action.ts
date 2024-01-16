"use server";
import { connectToDataBase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { GetQuestionsParams, CreateQuestionParams, GetQuestionByIdParams, QuestionVoteParams, DeleteQuestionParams, EditQuestionParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params:GetQuestionsParams) {
    try {
        connectToDataBase()
        const {searchQuery, filter} = params;

        const query: FilterQuery<typeof Question> = {};
        // Эта часть отвечает за поиск в инпуте что тоже приходит из параметров в качестве строки
        // Мы ищем совпадения по навзанию или же совпадения в контенте и тогда показывает данные которые совпадают
        if(searchQuery){
            query.$or = [
                {title: {$regex: new RegExp(searchQuery, "i")}},
                {content: {$regex: new RegExp(searchQuery, "i")}},
            ]
        }
        let sortOptions = {};
        // C параметров мы получаем строку из фильтр компонента и по этой строке мы делаем сортировку
        switch (filter){
            case "newest":
                sortOptions = {createdAt: -1}
                break;
            case "frequent":
                sortOptions = {views: -1}
                break
            case "unanswered":
                query.answers = {$size: 0}
                break;
                default:
                break;
        }
        const questions = await Question.find(query)
        // Почему мы делаем сдесь популейт? Это для того чтобы достать данные из этих частей так как монго дб изначально хранит только ссылки на эти таблицы и если мы хотим вытащить что там внутри то нужно сделать вот так
        .populate({path: "tags", model: Tag})
        .populate({path: "author", model: User})
        // Сортировка прокидывается вот сюда и если нет никаких совпадений то будет просто пустой обьект что отключает любую сортировку и показывает полный список данных
        .sort(sortOptions)
        
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
            {$setOnInsert: {name: tag}, $push: {questions: question._id}},
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
        console.log(error)
        throw error
    }
}

export async function getQuestionById(params:GetQuestionByIdParams) {
    try {
        connectToDataBase()
        const {questionId} = params;
        const question = await Question.findById(questionId)
        .populate({path: "tags", model: Tag, select: "_id name"})
        .populate({path: "author", model: User, select: "_id clerkId picture name"})
        return question;
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function getQuestionUpvote(params:QuestionVoteParams) {
    try {
        connectToDataBase()
        // Берем нужные параметры из пропсов компонента
        const {questionId, userId, hasdownVoted, hasupVoted, path} = params;
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
        const question = await Question.findByIdAndUpdate(questionId, updateQuery, {new: true})
        if(!question){
            throw new Error("Question is not found")
        }
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function getQuestionDownvote(params:QuestionVoteParams) {
    try {
        connectToDataBase()
        const {questionId, userId, hasdownVoted, hasupVoted, path} = params;
        let updateQuery = {};

        if(hasdownVoted){
            updateQuery = {$pull: {downvotes: userId}}
        } else if (hasupVoted){
            updateQuery = {$pull: {upvotes: userId}, $push: {downvotes: userId}}
        } else {
            updateQuery = {$addToSet: {downvotes: userId}}
        }

        const question = await Question.findByIdAndUpdate(questionId, updateQuery, {new: true})
        if(!question){
            throw new Error("Question is not found")
        }
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function deleteQuestion(params:DeleteQuestionParams) {
    try {
        connectToDataBase() 
        const {questionId, path} = params;
        // Удаляем все вопросы
         await Question.deleteOne({_id: questionId})
        //  Удаляем все ответы связанные с вопросом
         await Answer.deleteMany({question: questionId})
        //  Удаляем взаимодействия с вопросом
         await Interaction.deleteMany({question: questionId})
        //  Обновляем теги и убираем связь между несуществующим вопросом и обновляем все связи с обновленными данными после удаления
         await Tag.updateMany({questions: questionId}, {$pull: {questions: questionId}})
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function editQuestion(params:EditQuestionParams) {
    try {
        connectToDataBase() 
        const {questionId, path, content, title} = params;
        // Удаляем все вопросы
         const question = await Question.findByIdAndUpdate(questionId)
         .populate("tags")

         if(!question){
            throw new Error("Question is not found")
         }
         question.title = title;
         question.content = content;
         await question.save()
       
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getHotQuestions() {
    try {
        connectToDataBase()
        const hotQuestions = await Question.find({})
        .sort({views: -1, upvotes: -1})
        .limit(5)
        return hotQuestions;

    } catch (error) {
        console.log(error)
        throw error
    }
}

