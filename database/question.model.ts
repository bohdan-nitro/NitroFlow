import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    content: string;
    tags: Schema.Types.ObjectId[];
    views: string;
    upvoted: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    answers: Schema.Types.ObjectId[];
    createdAt: Date;
}

const QuestionSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    // Ref это будущая ссылка на другой интрейс или модель
    tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    views: {type: Number, default: 0},
    upvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{type: Schema.Types.ObjectId, ref: "User"}],
    author: [{type: Schema.Types.ObjectId, ref: "User"}],
    answers: [{type: Schema.Types.ObjectId, ref: "Answer"}],
    createdAt: {type: Date, default: Date.now}
})

// Создаем модель если с такой проверкой если ее нету то создаем модель с названием

const Question = models.Question || model("Question", QuestionSchema);

export default Question;