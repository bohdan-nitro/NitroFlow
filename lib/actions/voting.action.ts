// "use server"
// import Question from "@/database/question.model";
// import { connectToDataBase } from "../mongoose";
// import { usePathname } from "next/navigation";

// export async function upVote(params: any) {
//     try {
//         connectToDataBase();
//         const {itemId, hasSaved, userId, path} = params;
//         const upvote = await Question.findByIdAndUpdate(itemId, {

//         })
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }