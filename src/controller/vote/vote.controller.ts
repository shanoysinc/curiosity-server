import { RequestHandler } from "express";
import { Vote } from "../../entity/Vote";

export const updateVote: RequestHandler = async (req, res) => {
	try {
		const postId = { id: parseInt(req.params.id) };
		const { value } = req.body;

		await Vote.update({ post: postId }, { value });
		res.send({ message: "update vote!" });
	} catch (error) {
		res.send({ message: "unable to update vote!" });
	}
};
