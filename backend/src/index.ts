import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import blogRoute from "./routes/blogRoute";

const app = express();
const port = 3222;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.error(err));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
