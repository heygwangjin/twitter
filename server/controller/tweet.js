//* Controller (Model에 데이터 읽고 씀)
//* Logic 처리
import * as tweetRepository from "../data/tweet.js";

// next는 사용하지 않으면 생략
export async function getTweets(req, res) {
  const username = req.query.username; // ex) hostname/tweets?username=bob
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id; // ex) hostname/tweets/2
  const tweet = await tweetRepository.getById(id);

  if (tweet) res.status(200).json(tweet);
  else res.status(404).json({ message: `Tweet id(${id}) not found` });
}

export async function createTweet(req, res) {
  const { text, userId } = req.body;
  const tweet = await tweetRepository.create(text, userId);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
