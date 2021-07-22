//* Model (DATA)
//* Only Store, Read and Write Data (Controller의 요청에 따라)
import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT t.id, t.text, t.createdAT, t.userId, u.username, u.name, u.url FROM tweets as t JOIN users as u ON t.userId = u.id";
const ORDER_DESC = "ORDER BY t.createdAT DESC";

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE t.id=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId)); // tweet id에 알맞은 트윗의 전체 정보
}

export async function update(id, text) {
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
