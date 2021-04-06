import jsonwebToken from "jsonwebtoken";

export const createToken = (user: { id: number; email: string }) => {
	return jsonwebToken.sign(user, process.env.TOKEN_SECRET);
};
