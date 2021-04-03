import { RequestHandler } from "express";
import { Comment } from "../entity/Comment";

export const commentPermission: RequestHandler = async (req, res, next) => {
	const answerId = parseInt(req.params.id);
	const user = req.user;

	const comment = await Comment.findOne({ where: { user, id: answerId } });

	if (!comment) {
		return res.send({
			message: "You dont have permission to perform this task",
		});
	}

	next();
};
