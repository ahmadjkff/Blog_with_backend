import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";
import { addBlog } from "../services/blogService";

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

export default router;
