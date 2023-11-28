"use server";
import { connectToDataBase } from "../mongoose";

export async function AskQuestionAction(params?: any){
    try {
    connectToDataBase()
    } catch (error) {
        
    }
}