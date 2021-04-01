import jsonwebtoken from "jsonwebtoken";
import { RequestHandler } from "express";
import { User } from "../entity/User";
interface Token {
	id: number;
	username: string;
	iat: number;
}
export const checkAuth: RequestHandler = async (req, res, next) => {
	const tokenFromReq = req.headers.authorization.split(" ")[1] || "";

	const token = jsonwebtoken.verify(
		tokenFromReq,
		"abasbudcw23c!@@$@"
	) as Token;

	if (!token) {
		return res.send({ message: "unauthorize access!" });
	}

	const { id, username } = token;
	const user = await User.findOne({ username });
	if (!user) {
		return res.send({ message: "unauthorize access!" });
	}
	req.user = { id, username };
	next();
};
