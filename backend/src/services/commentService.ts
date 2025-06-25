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
