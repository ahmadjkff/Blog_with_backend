import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export const register = async ({
  username,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ username });
  if (findUser) return { data: "User Already exist", statusCode: 400 };

  const newUser = new userModel({ username, email, password });

  await newUser.save();
  return { statusCode: 201, data: generateJWT({ username, email, password }) };
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
    return { data: generateJWT({ username, password }), statusCode: 200 };

  //else
  return { data: "Incorrect password", statusCode: 400 };
};

function generateJWT(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET as string);
}
