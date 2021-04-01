import { RequestHandler } from "express";
import { User } from "../../entity/User";
import { createToken } from "../../../util/createToken";
import bcryptjs from "bcryptjs";

export const login: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.json({ message: "Invalid email address!" });
		}

		const verifyPassword = await bcryptjs.compare(password, user.password);

		if (!verifyPassword) {
			return res.json({ message: "Invalid password!" });
		}

		res.cookie(
			"token",
			createToken({ id: user.id, username: user.username }),
			{
				httpOnly: true,
				sameSite: true,
			}
		);
		res.send({ message: "signin  successfully!" });
	} catch (error) {
		res.send({ error: error.message });
	}
};

export const signup: RequestHandler = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (user) {
			console.log(user);

			return res.json({ message: "Invalid email address!" });
		}

		const newUser = User.create({ email, username, password });
		await newUser.save();

		res.cookie(
			"token",
			createToken({ id: user.id, username: user.username }),
			{
				httpOnly: true,
				sameSite: true,
			}
		);
		res.send({ message: "signup successfully!" });
	} catch (error) {
		res.send({ error: error.message });
	}
};
