import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId, // Ссылаемся на юзера
  action: string;
  question: Schema.Types.ObjectId; // Ссылаемся на вопрос или вопросы если их больше одного
  answers:  Schema.Types.ObjectId; // Также ссылаемся на оветы может юзер видел один ответ или несколько
  tags: Schema.Types.ObjectId[]; // Также и с тегами какие теги юзер просмотрел
  createdAt: Date;
}

const InteractionSchema = new Schema<IInteraction>({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    action: {type: String, required: true},
    question: {type: Schema.Types.ObjectId, ref: "Question"},
    answers: {type: Schema.Types.ObjectId, ref: "Answer"},
    tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    createdAt: {type: Date, default: Date.now}
  });
  
  const Interaction = models.Interaction || model<IInteraction>("Interaction", InteractionSchema);
  
  export default Interaction;