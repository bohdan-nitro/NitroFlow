"use server"
import { connectToDataBase } from "../mongoose";
import User from "@/database/user.model";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
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