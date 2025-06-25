import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  category: string;
  authorId: ObjectId | string;
  img?: string;
  claps: Array<string>;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    img: { type: String },
    claps: [{ type: String }],
  },
  { timestamps: true }
);

const blogModel = mongoose.model<IBlog>("Blog", blogSchema);

export default blogModel;
