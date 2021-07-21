let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    name: "Bob",
    email: "bob@gmail.com",
  },
  {
    id: "2",
    username: "heygwangjin",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    name: "Gwangjin",
    email: "cer3@ajou.ac.kr",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
