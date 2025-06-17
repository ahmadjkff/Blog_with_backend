import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  authorId: ObjectId | string;
  img?: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const blogModel = mongoose.model<IBlog>("Blog", blogSchema);

export default blogModel;
