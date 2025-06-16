import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";
import {
  addBlog,
  getBlog,
  getBlogs,
  getMyBlogs,
} from "../services/blogService";

const router = express.Router();

interface AddBlogBody {
  title: string;
  content: string;
}

router.post("/", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { title, content } = req.body as AddBlogBody;
    const authorId = req.user?.id;
    const { data, statusCode } = await addBlog({
      title,
      content,
      authorId,
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

export default router;
