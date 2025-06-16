import mongoose, { Schema, Document } from "mongoose";

const roles = ["user", "admin"];

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: roles, required: true },
});

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
