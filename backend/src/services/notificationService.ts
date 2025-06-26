import { ObjectId } from "mongoose";
import { IBlog } from "../models/blogModel";
import notificationModel from "../models/notificationModel";

export const newBlogNotification = async (
  title: string,
  authorId: ObjectId | string,
  newBlog: IBlog
) => {
  await notificationModel.create({
    message: `New blog titled "${title}" was posted.`,
    userId: authorId,
    blogId: newBlog._id,
  });
};
