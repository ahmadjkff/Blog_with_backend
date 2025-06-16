import { ObjectId } from "mongoose";
import blogModel from "../models/blogModel";

interface IAddBlogParams {
  title: string;
  content: string;
  authorId: ObjectId | string;
}

export const addBlog = async ({ title, content, authorId }: IAddBlogParams) => {
  try {
    if (!title || !content) {
      return { data: "Title and content are required", statusCode: 400 };
    }

    const newBlog = await blogModel.create({ title, content, authorId });

    await newBlog.save();
    return { data: newBlog, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};
