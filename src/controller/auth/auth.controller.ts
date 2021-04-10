import { RequestHandler } from "express";
import { User } from "../../entity/User";
import { createToken } from "../../auth/createToken";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Token } from "../../middleware/checkAuth";

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      select: ["password", "firstName", "lastName", "id"],
    });

    if (!user) {
      return res.json({ message: "Invalid email address!" });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.json({ message: "Invalid password!" });
    }

    // const validityDays = 30;
    // const expires = validityDays * 1000 * 60 * 60 * 24;
    // const today = new Date().getTime();
    // const expiresDate = new Date(today + expires);

    const { firstName, lastName, id } = user;
    const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    const token = createToken({ id, userInitials });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: true,
    //   expires: expiresDate,
    // });

    res.send({ token, userInitials });
  } catch (error) {
    console.log(error);

    res.send({ error: error.message });
  }
};

export const signup: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body as User;

    const user = await User.findOne({
      where: { email },
      select: ["password", "id"],
    });

    if (user) {
      return res.json({ message: "Invalid email address!" });
    }

    const newUser = User.create({ email, password, firstName, lastName });
    await newUser.save();

    // const validityDays = 30;
    // const expires = validityDays * 1000 * 60 * 60 * 24;
    // const today = new Date().getTime();
    // const expiresDate = new Date(today + expires);

    const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    const token = createToken({ id: user.id, userInitials });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: true,
    //   expires: expiresDate,
    // });

    res.send({ token, userInitials });
  } catch (error) {
    res.send({ error: error.message });
  }
};

export const verifyToken: RequestHandler = async (req, res) => {
  try {
    const tokenFromReq = req.headers.authorization.split(" ")[1] || "";

    const token = jsonwebtoken.verify(
      tokenFromReq,
      process.env.TOKEN_SECRET
    ) as Token;

    if (!token) {
      return res.send({ isAuth: false });
    }

    const { id, userInitials } = token;
    const user = await User.findOne({ id });
    if (!user) {
      return res.send({ isAuth: false });
    }
    req.user = { id, userInitials };
    res.send({ userInitials, isAuth: true });
  } catch (error) {
    res.send({ isAuth: false });
  }
};
