import express from "express";
import { login, register } from "../services/userService";
import bcrypt from "bcrypt";

const router = express.Router();

interface RegisterBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body as RegisterBody;

    const hashedPassword = await bcrypt.hash(password, 10);
    const { statusCode, data } = await register({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

interface LoginBody {
  username: string;
  password: string;
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body as LoginBody;

    const { statusCode, data } = await login({
      username,
      password,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
