import express from "express";
import notificationModel from "../models/notificationModel";
import { validateJWT } from "../middlewares/validateJWT";
import { IExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: IExtendRequest, res) => {
  const notifications = await notificationModel
    .find({ userId: req.user._id })
    .sort({ createdAt: -1 });
  res.status(200).json(notifications);
});

router.put("/:id/read", validateJWT, async (req: IExtendRequest, res) => {
  const notification = await notificationModel.findById(req.params.id);
  if (!notification) {
    res.status(404).send("Notification not found");
    return;
  }
  const newIsRead = !notification.isRead;
  await notificationModel.findByIdAndUpdate(req.params.id, {
    isRead: newIsRead,
  });
  res.status(200).send(`Marked as ${newIsRead ? "read" : "unread"}`);
});

export default router;
