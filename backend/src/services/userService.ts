import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const register = async ({
  username,
  email,
  password,
  role,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ username });
  if (findUser) return { data: "User Already exist", statusCode: 400 };

  const findEmail = await userModel.findOne({ email });
  if (findEmail) return { data: "Email already in use", statusCode: 400 };

  const newUser = new userModel({ username, email, password, role: "user" });

  await newUser.save();
  return {
    statusCode: 201,
    data: generateJWT({ id: newUser._id, username, email, role }),
  };
};

interface LoginParams {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams) => {
  const findUser = await userModel.findOne({ username });
  if (!findUser) return { data: "Invalid cardenalities", statusCode: 400 };

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch)
    return {
      data: generateJWT({
        id: findUser._id,
        username: findUser.username,
        role: findUser.role,
      }),
      statusCode: 200,
    };

  //else
  return { data: "Incorrect password", statusCode: 400 };
};

function generateJWT(data: any) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}
