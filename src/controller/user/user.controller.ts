import { RequestHandler } from "express";
import { User } from "../../entity/User";
import { createToken } from "../../auth/createToken";
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

		res.cookie("token", createToken({ id: user.id, email: user.email }), {
			httpOnly: true,
			sameSite: true,
		});
		res.send({ message: "signin  successfully!" });
	} catch (error) {
		res.send({ error: error.message });
	}
};

export const signup: RequestHandler = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body as User;

		const user = await User.findOne({ where: { email } });

		if (user) {
			return res.json({ message: "Invalid email address!" });
		}

		const newUser = User.create({ email, password, firstName, lastName });
		await newUser.save();

		res.cookie(
			"token",
			createToken({ id: newUser.id, email: newUser.email }),
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
