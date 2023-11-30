"use server"

import Tag from "@/database/tag.model";
import { connectToDataBase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";

export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
    try {
    connectToDataBase()
    const {userId} = params;
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found!")
    }
    return [{_id: "1", name: "js"}, {_id: "2", name: "css"},]
    } catch (error) {
    console.log(error)
    throw error
    }
}
export async function getAllTags(params:GetAllTagsParams) {
    try {
    connectToDataBase()
    const tags = await Tag.find({})
    return {tags}
    } catch (error) {
    console.log(error)
    throw error
    }
}