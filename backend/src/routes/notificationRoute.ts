import express from "express";
import notificationModel from "../models/notificationModel";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: IExtendRequest, res) => {
  const notifications = await notificationModel
    .find({ userId: req.user?._id })
    .sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

router.put("/:id/read", validateJWT, async (req: IExtendRequest, res) => {
  await notificationModel.findByIdAndUpdate(req.params.id, { isRead: true });
  res.status(200).send("Marked as read");
});

export default router;
