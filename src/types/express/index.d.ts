import { Express } from "express-serve-static-core";

declare global {
	namespace Express {
		export interface Request {
			user: { id: number; username: string };
		}
	}
}
