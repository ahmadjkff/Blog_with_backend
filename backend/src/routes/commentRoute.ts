import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";
import { addComment } from "../services/commentService";

const router = express.Router();

router.post("/", validateJWT, async (req: IExtendRequest, res) => {
  try {
    const { blogId, comment } = req.body;
    const authorId = req.user?.id;
    if (!authorId || !blogId || !comment) {
      res.status(400).send("Missing required fields");
    }
    const result = await addComment(authorId, blogId, comment);
    res.status(result.statusCode).send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
