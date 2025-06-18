import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";
import {
  addBlog,
  getBlog,
  getBlogs,
  getMyBlogs,
  modifyBlog,
  removeBlog,
} from "../services/blogService";
import blogModel from "../models/blogModel";
import { isAdmin } from "../middlewares/idAdmin";

const router = express.Router();

interface AddBlogBody {
  title: string;
  content: string;
  img?: string;
}

router.post("/", validateJWT, isAdmin, async (req: IExtendRequest, res) => {
  try {
    const { title, content, img } = req.body as AddBlogBody;
    const authorId = req.user?.id;
    const { data, statusCode } = await addBlog({
      title,
      content,
      authorId,
      img,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { data, statusCode } = await getBlogs();

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/my-blogs", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(401).send("User not found in token");

    const { data, statusCode } = await getMyBlogs({ userId });
    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);

    res.status(500).send("Internal server error");
  }
});

router.get("/:blogId", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { blogId } = req.params;
    const { data, statusCode } = await getBlog({ blogId });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put(
  "/:blogId",
  validateJWT,
  isAdmin,
  async (req: IExtendRequest, res) => {
    try {
      const { blogId } = req.params;
      const newBlog = req.body;
      const user = req.user;

      if (!blogId) res.status(400).send("blogId is missing");

      const blog = await blogModel.findById(blogId);

      if (!blog) res.status(404).send("Blog not found");

      const isOwner = blog?.authorId.toString() === user?._id.toString();
      const isAdmin = user?.role === "admin";

      if (!isOwner && !isAdmin) {
        res.status(403).send("Unauthorized to edit this blog");
      }

      const { data, statusCode } = await modifyBlog({ blogId, newBlog });

      res.status(statusCode).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.delete(
  "/:blogId",
  validateJWT,
  isAdmin,
  async (req: IExtendRequest, res) => {
    try {
      const { blogId } = req.params;
      const user = req.user;

      if (!blogId) res.status(400).send("blogId is missing");

      const blog = await blogModel.findById(blogId);

      if (!blog) res.status(404).send("Blog not found");

      const isOwner = blog?.authorId.toString() === user?._id.toString();
      const isAdmin = user?.role === "admin";

      if (!isOwner && !isAdmin) {
        res.status(403).send("Unauthorized to remove this blog");
      }

      const { data, statusCode } = await removeBlog({ blogId });

      res.status(statusCode).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
