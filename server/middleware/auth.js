import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id); // id로 토큰을 생성했기 때문에 decoded에는 id가 있음
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; // 앞으로 이어지는 다른 콜백에서 동일하게 접근 되어지는 데이터 req.customData 등록 가능
    next();
  });
};
