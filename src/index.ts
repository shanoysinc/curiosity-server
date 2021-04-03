import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { checkAuth } from "./middleware/checkAuth";
import userRouter from "./routes/user/user.router";
import questionRouter from "./routes/question/question.router";
import AnswerRouter from "./routes/answer/answer.router";
import commentRouter from "./routes/comment/comment.router";
import answerVoteRouter from "./routes/vote/answerVote.router";
import commentVoteRouter from "./routes/vote/commentVote.router";

createConnection()
	.then(async (connection) => {
		const PORT = process.env.PORT || 3000;

		const app = express();
		app.use(cors());
		app.use(helmet());
		app.use(compression());

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.use("/api/user", userRouter);
		app.use("/api/questions", checkAuth, questionRouter);

		app.use("/api/answers", checkAuth, AnswerRouter);
		app.use("/api/vote", checkAuth, answerVoteRouter);

		app.use("/api/comments", checkAuth, commentRouter);
		app.use("/api/vote", checkAuth, commentVoteRouter);

		app.listen(PORT, () => console.log("serving runnin on port", PORT));
	})
	.catch((error) => console.log(error));
