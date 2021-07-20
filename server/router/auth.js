import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username은 5 글자 이상으로 입력 부탁드립니다"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("비밀번호는 6 글자 이상으로 입력 부탁드립니다"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").trim().notEmpty().withMessage("이름을 입력 부탁드립니다."),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("유효하지 않은 이메일입니다."),
  body("url")
    .trim()
    .isURL()
    .withMessage("유효하지 않은 URL 입니다.")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

// TODO: POST /auth/signup
router.post("/signup", validateSignup, authController.signup);
// TODO: POST /auth/login
router.post("/login", validateCredential, authController.login);
// TODO: GET /auth/me
router.get("/me", isAuth, authController.me);

export default router;
