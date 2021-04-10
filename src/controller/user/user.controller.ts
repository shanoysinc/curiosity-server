import { RequestHandler } from "express";
import { Answer } from "../../entity/Answer";
import { Question } from "../../entity/Question";

export const getUserAnswers: RequestHandler = async (req, res) => {
	try {
		const user = { id: req.user.id };
		const answers = await Answer.find({ where: { user } });

		res.send({ answers });
	} catch (error) {
		console.log(error);
		res.send({ message: "unable to fetch user answers" });
	}
};

export const getUserQuestions: RequestHandler = async (req, res) => {
	try {
		const user = { id: req.user.id };
		const questions = await Question.find({ where: {user} });

		res.send({ questions });
	} catch (error) {
		console.log(error);
		res.send({ message: "unable to fetch user answers" });
	}
};
