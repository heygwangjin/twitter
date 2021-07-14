import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

// Validation
// Sanitization
// Contract Testing: Client-Server
const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("내용은 세 글자 이상으로 입력 부탁드립니다."),
  validate,
];

// TODO: GET /tweets
// TODO: GET /tweets?username=:username
//* 함수를 호출하면 값이 return 되기 때문에, 반드시 함수를 연결해야 한다.
router.get("/", tweetController.getTweets);

// TODO: GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// TODO: POST /tweets
router.post("/", validateTweet, tweetController.createTweet);

// TODO: PUT /tweets/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

// TODO: DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
