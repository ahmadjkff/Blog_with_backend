import mongoose, { Document, Schema } from "mongoose";

interface INotification extends Document {
  message: string;
  userId: mongoose.Schema.Types.ObjectId;
  blogId: mongoose.Schema.Types.ObjectId;
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    message: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default notificationModel;
