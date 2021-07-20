import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth.js";

// TODO: Make it secure!
const jwtSecretKey = "Zr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  // 동일한 username 있는지 확인
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res
      .status(409)
      .json({ message: `${username}은 이미 존재하는 닉네임입니다.` });
  }
  // 새로운 사용자 생성
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);

  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
