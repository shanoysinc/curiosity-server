import { RequestHandler } from "express";
import { Vote } from "../../entity/Vote";

export const answerUpVote: RequestHandler = async (req, res) => {
	try {
		const answer = { id: parseInt(req.params.id) };
		const user = req.user;

		const currentVote = await Vote.findOne({
			where: { user, answer },
		});
		if (!currentVote) {
			const newVote = Vote.create({ answer, user });
			await newVote.save();
			return res.send({ message: "added a new vote!" });
		}

		const { value, upVote } = currentVote;

		if (upVote) {
			await Vote.update(
				{ answer, user },
				{ value: value - 1, upVote: false, downVote: false }
			);
			return res.send({ message: "update answer vote!" });
		}

		await Vote.update(
			{ answer, user },
			{ value: value + 1, upVote: true, downVote: false }
		);
		res.send({ message: "update answer vote!" });
	} catch (error) {
		res.send({ message: "unable to update answer vote!" });
	}
};

export const answerDownVote: RequestHandler = async (req, res) => {
	try {
		const answer = { id: parseInt(req.params.id) };
		const user = req.user;

		const currentVote = await Vote.findOne({
			where: { user, answer },
		});
		if (!currentVote) {
			const newVote = Vote.create({ answer, user });
			await newVote.save();
			return res.send({ message: "added a new vote!" });
		}

		const { value, downVote } = currentVote;

		if (downVote) {
			await Vote.update(
				{ answer, user },
				{ value: value + 1, upVote: false, downVote: false }
			);
			return res.send({ message: "update answer vote!" });
		}

		await Vote.update(
			{ answer, user },
			{ value: value - 1, upVote: false, downVote: true }
		);
		res.send({ message: "update answer vote!" });
	} catch (error) {
		res.send({ message: "unable to update answer vote!" });
	}
};
