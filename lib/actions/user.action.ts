"use server"
import { connectToDataBase } from "../mongoose";
import User from "@/database/user.model";
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
        // const {page = 1, pageSize = 20, filter, searchQuery} = params;
        const users = await User.find({}).sort({createdAt: -1});
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

// export async function getAllUsers(params:GetAllUsersParams) {
//     try {
//         connectToDataBase()

//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }