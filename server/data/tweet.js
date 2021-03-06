//* Model (DATA)
//* Only Store, Read and Write Data (Controller의 요청에 따라)
import MongoDB from "mongodb";
import { getTweets } from "../database/database.js";
import * as UserRepository from "./auth.js";
const ObjectID = MongoDB.ObjectID;

// NoSQL 정보의 중복성 > 관계: 쿼리의 성능을 위해서

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 }) // -1 desc, +1 asce
    .toArray() // _id
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  return UserRepository.findById(userId)
    .then((user) =>
      getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url,
      })
    )
    .then((result) => result.ops[0])
    .then(mapOptionalTweet);
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnOriginal: false }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectID(id) });
}

function mapTweets(tweets) {
  return tweets.map((t) => ({ ...t, id: t._id.toString() }));
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
