import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";
import { addComment, getComments } from "../services/commentService";

const router = express.Router();

router.post("/", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { blogId, comment } = req.body;
    const authorId = req.user?.id;
    if (!authorId || !blogId || !comment) {
      res.status(400).send("Missing required fields");
    }
    const { data, statusCode } = await addComment(authorId, blogId, comment);
    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { blogId } = req.body;
    const { data, statusCode } = await getComments(blogId);

    res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
