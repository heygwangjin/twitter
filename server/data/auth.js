import MongoDB from "mongodb";
import { getUsers } from "../database/database.js";
const ObjectID = MongoDB.ObjectID;

export async function findByUsername(username) {
  return getUsers().find({ username }).next().then(mapOptionalUser); // find는 cursor를 return
}

export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.ops[0]._id.toString()); // _id는 원래 MongoDB object
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
