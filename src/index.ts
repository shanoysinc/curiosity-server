import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import userRouter from "./routes/user/user.router";
import postRouter from "./routes/post/post.router";
import { checkAuth } from "./auth/checkAuth";
import voteRouter from "./routes/vote/vote.router";
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
		app.use("/api/posts", checkAuth, postRouter);
		app.use("/api/vote", checkAuth, voteRouter);

		app.listen(PORT, () => console.log("serving runnin on port", PORT));
	})
	.catch((error) => console.log(error));
