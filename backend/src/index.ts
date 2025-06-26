import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import blogRoute from "./routes/blogRoute";
import commentRoute from "./routes/commentRoute";
import notificationRoute from "./routes/notificationRoute";
import cors from "cors";

const app = express();
const port = 3222;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error(err));

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);
app.use("/notification", notificationRoute);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
