import { ObjectId } from "mongoose";
import blogModel from "../models/blogModel";

interface IAddBlogParams {
  title: string;
  content: string;
  authorId: ObjectId | string;
  img?: string;
}

export const addBlog = async ({
  title,
  content,
  authorId,
  img,
}: IAddBlogParams) => {
  try {
    if (!title || !content) {
      return { data: "Title and content are required", statusCode: 400 };
    }

    const newBlog = await blogModel.create({ title, content, authorId, img });

    await newBlog.save();
    return { data: newBlog, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};

export const getBlogs = async () => {
  try {
    const blogs = await blogModel.find({}).populate("authorId", "username");
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

interface IModifyBlog {
  blogId: string;
  newBlog: {
    title?: string;
    content?: string;
    img?: string;
  };
}

export const modifyBlog = async ({ blogId, newBlog }: IModifyBlog) => {
  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) return { data: "Blog not found", statusCode: 404 };

    if (newBlog.title !== undefined) blog.title = newBlog.title;
    if (newBlog.content !== undefined) blog.content = newBlog.content;
    if (newBlog.img !== undefined) blog.img = newBlog.img;

    await blog.save();
    return { data: blog, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { data: "Internal server error", statusCode: 500 };
  }
};

interface IRemoveBlog {
  blogId: string;
}

export const removeBlog = async ({ blogId }: IRemoveBlog) => {
  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) return { data: "Blog is not found", statusCode: 400 };

    await blog.deleteOne();

    return { data: blog, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { data: "Something went wrong", statusCode: 500 };
  }
};
