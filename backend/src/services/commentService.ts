import { ObjectId } from "mongoose";
import blogModel from "../models/blogModel";
import commentModel from "../models/commentModel";

export const addComment = async (
  authorId: string,
  blogId: string,
  comment: string
) => {
  try {
    const newComment = await commentModel.create({ authorId, blogId, comment });
    return { data: newComment, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};

export const getComments = async (blogId: ObjectId) => {
  try {
    const comments = await commentModel.find({ blogId: blogId }).lean();
    return { data: comments, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};
