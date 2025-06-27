import { ObjectId } from "mongoose";
import { IBlog } from "../models/blogModel";
import notificationModel from "../models/notificationModel";
import userModel from "../models/userModel";

export const newBlogNotification = async (title: string, newBlog: IBlog) => {
  const allUsers = await userModel.find({});

  for (const user of allUsers) {
    await notificationModel.create({
      message: `New blog titled "${title}" was posted.`,
      userId: user._id, // 👈 tie each notification to a user
      blogId: newBlog._id,
    });
  }
};
