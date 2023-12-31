"use server"

import Tag, {ITag} from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import { connectToDataBase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";
import Question from "@/database/question.model";


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
export async function getQuestionByTagId(params:GetQuestionsByTagIdParams) {
    try {
    connectToDataBase()
    const {tagId, searchQuery} = params;
    const tagFilter: FilterQuery<ITag> = {_id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
        path: "questions",
        model: Question,
        match: searchQuery ? {title: {$regex: searchQuery, $options: "i"}} : {},
        options: {
            sort: {createdAt: -1}
        },
        populate: [
            {path: "tags", model: Tag, select: "_id name"},
            {path: "author", model: User, select: "_id name picture clerkId"}
        ]
    })
    if(!tag){
        throw new Error("Tags is not found")
    }
    const questions = tag.questions;
    return {tagTitle: tag.name, questions}
    } catch (error) {
    console.log(error)
    throw error
    }
}