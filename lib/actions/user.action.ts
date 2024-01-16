"use server"
import { connectToDataBase } from "../mongoose";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params:any) {
    try {
        connectToDataBase()

        const {userId} = params;
        const user = await User.findOne({clerkId: userId})
        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createUser(userData:CreateUserParams) {
    try {
        connectToDataBase()

        const newUser = User.create(userData);
        return newUser;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function updateUser(params:UpdateUserParams) {
    try {
        connectToDataBase()
        const {clerkId, path, updateData} = params;
        // Обновляем юзера по айди прокидываем новые данные и говорим чтобы база обновила данные что это будет новый инстанс юзера в базе данных
        await User.findOneAndUpdate({clerkId}, updateData, {
            new: true
        });
        // Сбрасываем кеш и обновялем состояние даты чтобы получить свежые данные с базы данных
      revalidatePath(path)
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteUserAction(params:DeleteUserParams) {
    try {
        connectToDataBase()
        const {clerkId} = params;

        const user = await User.findOneAndDelete({clerkId});
        if(!user){
            throw new Error("User is not found!")
        }

        // Delete everything from user tags answers comments and user aswell

        // const userQuestion = await Question.find({author: user._id}).distinct("_id")

        // Delete questions
        await Question.deleteMany({author: user._id})

        // Delete user
       const deleteUser = await User.findByIdAndDelete(user._id)
       return deleteUser;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getAllUsers(params:GetAllUsersParams) {
    try {
        connectToDataBase();
        const {searchQuery, filter} = params;
        const query: FilterQuery<typeof User> = {};
        if(searchQuery){
            query.$or = [
                {name: {$regex: new RegExp(searchQuery, "i")}},
                {username: {$regex: new RegExp(searchQuery, "i")}},
            ]
        }
        let sortOptions = {};

        switch (filter){
            case "new_users":
                sortOptions = {joinedAt: -1}
                break;
            case "old_users":
                sortOptions = {joinedAt: 1}
                break;
            case "top_contributors":
                sortOptions = {reputation: -1}
                break;
                default:
                break;
        }

        const users = await User.find(query).sort(sortOptions);
        return {users};
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function toggleSaveQuestion(params:ToggleSaveQuestionParams) {
    try {
        connectToDataBase()
        const {questionId, path, userId} = params;
        const user = await User.findById(userId)
        if(!user){
            throw new Error("User is not found")
        }
        const questionIsSaved = user.saved.includes(questionId);
        if(questionIsSaved){
            // Если у нас уже сохраненый вопрос то тогда мы убираем его из списка
            await User.findByIdAndUpdate(userId, 
                {$pull: {saved: questionId}},
                {new: true}
            )
        } else {
            // Если нету до добавляем в список
            await User.findByIdAndUpdate(userId, 
                {$addToSet: {saved: questionId}},
                {new: true}
            )
        }
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getSavedQuestions(params:GetSavedQuestionsParams) {
    try {
        connectToDataBase()
        const {clerkId, searchQuery, filter} = params;

        let sortOptions = {};

        switch (filter){
            case "most_recent":
                sortOptions = {createdAt: -1}
                break;
            case "most_voted":
                sortOptions = {upvotes: -1}
                break;
            case "most_viewed":
                sortOptions = {views: -1}
                break;
            case "most_answered":
                sortOptions = {answers: -1}
                break;
            case "oldest":
                sortOptions = {createdAt: 1}
                break;
                default:
                break
        }

        const query: FilterQuery<typeof Question> = searchQuery ? {title: {$regex: new RegExp(searchQuery, "i")}} :
        { };
        const user = await User.findOne({clerkId}).populate({
            path: "saved",
            match: query,
            options: {
                sort: sortOptions
            },
            populate: [
                {path: "tags", model: Tag, select: "_id name"},
                {path: "author", model: User, select: "_id name picture clerkId"}
            ]
        })
        if(!user){
            throw new Error("User is not found")
        }
        const savedQuestions = user.saved;
        return {questions: savedQuestions}

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserInfo(params:GetUserByIdParams) {
    try {
        connectToDataBase()
        const {userId} = params;
        const user = await User.findOne({userId})
        if(!user){
            throw new Error("User not found")
        }
        const totalQeustions = await Question.countDocuments({author: user._id})
        const totalAnswers = await Answer.countDocuments({author: user._id})

        return {user, totalQeustions, totalAnswers}

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserQuestions(params:GetUserStatsParams) {
    try {
        connectToDataBase()
        const {userId} = params;
        const totalQuestion = await Question.countDocuments({author: userId})
        const userQuestions = await Question.find({author: userId})
        .sort({views: -1, upvotes: -1})
        .populate('tags', "_id name")
        .populate("author", "_id name clerkId picture")
        return {totalQuestion, questions: userQuestions}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserAnswers(params:GetUserStatsParams) {
    try {
        connectToDataBase()
        const {userId} = params;
        const totalAnswers = await Answer.countDocuments({author: userId})
        const userAnswers = await Answer.find({author: userId})
        .sort({upvotes: -1})
        .populate('question', "_id title")
        .populate("author", "_id name clerkId picture")
        return {totalAnswers, answers: userAnswers}
    } catch (error) {
        console.log(error)
        throw error
    }
}


// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDataBase()

//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }