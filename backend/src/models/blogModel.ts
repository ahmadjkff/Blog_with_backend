import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  category: string;
  authorId: ObjectId | string;
  img?: string;
  claps: Array<ObjectId | string>;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    img: { type: String },
    claps: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const blogModel = mongoose.model<IBlog>("Blog", blogSchema);

export default blogModel;
