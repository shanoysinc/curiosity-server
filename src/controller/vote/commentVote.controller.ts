import { RequestHandler } from "express";
import { Vote } from "../../entity/Vote";

export const commentUpVote: RequestHandler = async (req, res) => {
	try {
		const comment = { id: parseInt(req.params.id) };
		const user = req.user;

		const currentVote = await Vote.findOne({
			where: { user, comment },
		});
		if (!currentVote) {
			const newVote = Vote.create({ comment, user });
			await newVote.save();
			return res.send({ message: "added a new vote!" });
		}

		const { value, upVote } = currentVote;

		if (upVote) {
			await Vote.update(
				{ comment, user },
				{ value: value - 1, upVote: false, downVote: false }
			);
			return res.send({ message: "update comment vote!" });
		}

		await Vote.update(
			{ comment, user },
			{ value: value + 1, upVote: true, downVote: false }
		);
		res.send({ message: "update vote!" });
	} catch (error) {
		res.send({ message: "unable to update comment vote!" });
	}
};

export const commentDownVote: RequestHandler = async (req, res) => {
	try {
		const comment = { id: parseInt(req.params.id) };
		const user = req.user;

		const currentVote = await Vote.findOne({
			where: { user, comment },
		});
		if (!currentVote) {
			const newVote = Vote.create({ comment, user });
			await newVote.save();
			return res.send({ message: "added a new vote!" });
		}

		const { value, downVote } = currentVote;

		if (downVote) {
			await Vote.update(
				{ comment, user },
				{ value: value + 1, upVote: false, downVote: false }
			);
			return res.send({ message: "update comment vote!" });
		}

		await Vote.update(
			{ comment, user },
			{ value: value - 1, upVote: false, downVote: true }
		);
		return res.send({ message: "update comment vote!" });
	} catch (error) {
		res.send({ message: "unable to update comment vote!" });
	}
};
