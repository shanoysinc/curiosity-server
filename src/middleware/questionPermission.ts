import { RequestHandler } from "express";
import { Question } from "../entity/Question";

export const questionPermission: RequestHandler = async (req, res, next) => {
	const questionId = parseInt(req.params.id);
	const user = req.user;

	const question = await Question.findOne({
		where: { user, id: questionId },
	});

	if (!question) {
		return res.send({
			message: "You dont have permission to perform this task",
		});
	}

	next();
};
