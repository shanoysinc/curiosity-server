import jsonwebToken from "jsonwebtoken";

export const createToken = (user: { id: number; userInitials: string }) => {
  return jsonwebToken.sign(user, process.env.TOKEN_SECRET);
};
