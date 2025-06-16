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

export const getBlogs = async () => {
  try {
    const blogs = await blogModel.find({});
    return { data: blogs, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};

interface IGetMyBlogs {
  userId: string;
}

export const getMyBlogs = async ({ userId }: IGetMyBlogs) => {
  try {
    if (!userId) return { data: "User is not found", statusCode: 400 };

    const myBlogs = await blogModel.find({ authorId: userId });

    return { data: myBlogs, statusCode: 200 };
  } catch (error) {
    console.error(error);

    return { data: "Something went wrong", statusCode: 500 };
  }
};

interface IGetBlog {
  blogId: string;
}

export const getBlog = async ({ blogId }: IGetBlog) => {
  try {
    if (!blogId) return { data: "blogId is missing", statusCode: 400 };

    const blog = await blogModel.findById(blogId);

    if (!blog)
      return { data: "Blog with this id does not exist", statusCode: 400 };

    return { data: blog, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};
