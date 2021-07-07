import express from "express";
import "express-async-errors";

const router = express.Router();

let tweets = [
  {
    id: "1",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "HI!",
    createdAt: Date.now().toString(),
    name: "Gwangjin",
    username: "heygwangjin",
  },
];

// TODO: GET /tweets
// TODO: GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  res.status(200).json(data);
});

// TODO: GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);

  if (tweet) res.status(200).json(tweet);
  else res.status(404).json({ message: `Tweet id(${id}) not found` });

  // tweets.forEach((tweet) => {
  //   if (tweet.id === id) res.status(200).send(tweet);
  // });

  // res.sendStatus(404);
});

// TODO: POST /tweets
router.post("/", (req, res, next) => {
  const tweet = {
    id: Date.now().toString(),
    createAt: new Date(),
    name: req.body.name,
    username: req.body.username,
    text: req.body.text,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// TODO: PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }

  // tweets.forEach((tweet) => {
  //   if (tweet.id === id) {
  //     tweet.text = req.body.text;
  //     res.status(200).json(tweet);
  //   }
  // });
  // res.sendStatus(404);
});

// TODO: DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
  // for (let i = 0; i < tweets.length; i++) {
  //   if (tweets[i].id === id) {
  //     tweets.splice(i, 1);
  //     res.sendStatus(204);
  //   }
  // }
  // res.sendStatus(404);
});

export default router;
