import jsonwebToken from "jsonwebtoken";

export const createToken = (user: { id: number; username: string }) => {
	return jsonwebToken.sign(user, "abasbudcw23c!@@$@");
};
