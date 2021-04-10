import { RequestHandler } from "express";
import { Comment } from "../../entity/Comment";
import { Vote } from "../../entity/Vote";

export const getComments: RequestHandler = async (req, res) => {
	try {
		const answerId = { id: parseInt(req.params.id) };
		const comments = await Comment.find({ where: answerId });

		res.send({ comments });
	} catch (error) {
		console.log(error);
		res.send({ message: "unable to fetch comments" });
	}
};

export const createComment: RequestHandler = async (req, res) => {
	try {
		const answerId = { id: parseInt(req.params.id) };
		const user = req.user;
		const { content } = req.body;

		const newComment = Comment.create({
			content,
			answer: answerId,
			user,
		});
		await newComment.save();

		const newVote = Vote.create({
			user,
			comment: newComment,
		});

		await newVote.save();

		res.send({ message: "comment created" });
	} catch (error) {
		console.log(error);

		res.send({ message: "unable to create comment" });
	}
};

export const updateComment: RequestHandler = async (req, res) => {
	try {
		const commentId = parseInt(req.params.id);
		const { content } = req.body;

		await Comment.update({ id: commentId }, { content });

		res.send({ message: "update comment!" });
	} catch (error) {
		res.send({ message: "unable to update comment!" });
	}
};

export const deleteComment: RequestHandler = async (req, res) => {
	try {
		const commentId = parseInt(req.params.id);

		await Comment.delete({ id: commentId });

		res.send({ message: "comment successfully delete!" });
	} catch (error) {
		res.send({ message: "unable to delete comment!" });
	}
};
