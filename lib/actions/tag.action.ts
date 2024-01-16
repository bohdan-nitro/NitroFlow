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
    const {searchQuery, filter} = params;
    const query: FilterQuery<typeof Tag> = {};

    // Если есть данные с инпута то мы будем искать по ним совпадения в базе через regex
    if(searchQuery){
        query.$or = [
            {name: {$regex: new RegExp(searchQuery, "i")}}
        ]
    }
    let sortOptions = {};

    switch (filter){
        case "old":
            sortOptions = {createdAt: 1}
            break;
        case "popular":
            sortOptions = {questions: -1}
            break;
        case "name":
            sortOptions = {name: 1}
            break;
        case "recent":
            sortOptions = {createdAt: -1}
            break;
        default:
            break;
    }
    // Возвращаем либо те данные которые совпадают по квери либо все данные прокидывая пустой обьект
    const tags = await Tag.find(query).sort(sortOptions)
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

export async function getHotTags() {
    try {
        connectToDataBase()
        const hotTags = await Tag.aggregate([
            {$project: {name: 1, numberOfQuestions: {$size: "$questions"}}},
            {$sort: {numberOfQuestions: -1}},
            {$limit: 5}
        ])
        return hotTags;

    } catch (error) {
        console.log(error)
        throw error
    }
}