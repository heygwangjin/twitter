import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetRouter from "./router/tweet.js";

const app = express();

app.use(express.json()); // req.body 파싱
app.use(helmet());
app.use(cors());
app.use(morgan("short"));

// Router
app.use("/tweets", tweetRouter);

// Not Found
app.use((req, res, next) => {
  res.status(404).send("Not available😢");
});

// Error Handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Sorry, try later😢");
});

app.listen(8080);
