import jsonwebtoken from "jsonwebtoken";
import { RequestHandler } from "express";
import { User } from "../entity/User";
interface Token {
	id: number;
	email: string;
	iat: number;
}
export const checkAuth: RequestHandler = async (req, res, next) => {
	const tokenFromReq = req.headers.authorization.split(" ")[1] || "";

	const token = jsonwebtoken.verify(
		tokenFromReq,
		process.env.TOKEN_SECRET
	) as Token;

	if (!token) {
		return res.send({ message: "unauthorize access!" });
	}

	const { id, email } = token;
	const user = await User.findOne({ email });
	if (!user) {
		return res.send({ message: "unauthorize access!" });
	}
	req.user = { id, email };
	next();
};
