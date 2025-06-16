import express from "express";
import { login, register } from "../services/userService";
import bcrypt from "bcrypt";

const router = express.Router();

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body as RegisterBody;

  const hashedPassword = await bcrypt.hash(password, 10);
  const { statusCode, data } = await register({
    username,
    email,
    password: hashedPassword,
  });

  res.status(statusCode).send(data);
});

interface LoginBody {
  username: string;
  password: string;
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body as LoginBody;

  const { statusCode, data } = await login({
    username,
    password,
  });

  res.status(statusCode).send(data);
});

export default router;
