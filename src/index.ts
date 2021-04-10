import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { connect2Database, getDbOptions } from "./db/db";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { checkAuth } from "./middleware/checkAuth";
import userRouter from "./routes/user/user.router";
import newsFeedRouter from "./routes/newsFeed/newsFeed.router";
import AnswerRouter from "./routes/answer/answer.router";
import commentRouter from "./routes/comment/comment.router";
import answerVoteRouter from "./routes/vote/answerVote.router";
import commentVoteRouter from "./routes/vote/commentVote.router";
import questionRouter from "./routes/question/question.router";
import authRouter from "./routes/auth/auth.router";

export default connect2Database(getDbOptions)
  .then(async (connection) => {
    const PORT = process.env.PORT || 4000;

    const app = express();
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(helmet());
    app.use(compression());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/auth", authRouter);

    app.use("/api/user", checkAuth, userRouter);

    app.use("/api/news-feed", checkAuth, newsFeedRouter);

    app.use("/api/question", checkAuth, questionRouter);

    app.use("/api/answers", checkAuth, AnswerRouter);
    app.use("/api/vote", checkAuth, answerVoteRouter);

    app.use("/api/comments", checkAuth, commentRouter);
    app.use("/api/vote", checkAuth, commentVoteRouter);

    app.listen(PORT, () => console.log("serving runnin on port", PORT));
  })
  .catch((error) => console.log(error));
