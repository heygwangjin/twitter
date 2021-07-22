import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/tweet.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { db } from "./db/database.js";

const app = express();

app.use(express.json()); // req.body 파싱
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// Router
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

// Not Found
app.use((req, res, next) => {
  res.status(404).send("Not available😢");
});

// Error Handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Sorry, try later😢");
});

const server = app.listen(config.host.port);
initSocket(server);
