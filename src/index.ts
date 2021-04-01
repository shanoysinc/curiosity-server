import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
// import { User } from "./entity/User";

createConnection()
	.then(async (connection) => {
		const PORT = process.env.PORT || 3000;

		const app = express();
		app.use(cors());
		app.use(helmet());
		app.use(compression());

		app.listen(PORT, () => console.log("serving runnin on port", PORT));
	})
	.catch((error) => console.log(error));
