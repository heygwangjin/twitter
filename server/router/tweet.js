import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

// TODO: GET /tweets
// TODO: GET /tweets?username=:username
//* 함수를 호출하면 값이 return 되기 때문에, 반드시 함수를 연결해야 한다.
router.get("/", tweetController.getTweets);

// TODO: GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// TODO: POST /tweets
router.post("/", tweetController.createTweet);

// TODO: PUT /tweets/:id
router.put("/:id", tweetController.updateTweet);

// TODO: DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
