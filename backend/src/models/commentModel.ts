import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IComment extends Document {
  comment: string;
  blogId: ObjectId | string;
  authorId: ObjectId | string;
}

const commentSchema = new Schema<IComment>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const commentModel = mongoose.model<IComment>("Comment", commentSchema);

export default commentModel;
