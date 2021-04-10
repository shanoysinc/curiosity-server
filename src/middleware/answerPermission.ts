import { RequestHandler } from "express";
import { Answer } from "../entity/Answer";

export const answerPermission: RequestHandler = async (req, res, next) => {
	const answerId = parseInt(req.params.id);
	const user = req.user;

	const answer = await Answer.findOne({ where: { user, id: answerId } });

	if (!answer) {
		return res.send({
			message: "You dont have permission to perform this task",
		});
	}

	next();
};
