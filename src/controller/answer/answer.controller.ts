import { RequestHandler } from "express";
import { Answer } from "../../entity/Answer";
import { Question } from "../../entity/Question";
import { Vote } from "../../entity/Vote";

export const getAnswers: RequestHandler = async (req, res) => {
	try {
		const questionId = { id: parseInt(req.params.id) };

		const question = await Question.findOne({ where: questionId });
		const answers = await Answer.createQueryBuilder("answer")
			.leftJoinAndSelect("answer.user", "user")
			.leftJoinAndSelect("answer.votes", "votes")
			.where("answer.question_id = :id", questionId)
			.getMany();

		const modQuestion = { ...question, numOfAnswers: answers.length };

		res.send({ question: modQuestion, answers });
	} catch (error) {
		console.log(error);

		res.send({ message: "unable to fetch answers" });
	}
};

export const createAnswer: RequestHandler = async (req, res) => {
	try {
		const questionId = { id: parseInt(req.params.id) };
		const user = req.user;
		const { content } = req.body;

		const newAnswer = Answer.create({
			content,
			question: questionId,
			user,
		});
		await newAnswer.save();

		const newVote = Vote.create({
			answer: newAnswer,
			user,
		});

		await newVote.save();

		res.send({ message: "answer created" });
	} catch (error) {
		console.log(error);

		res.send({ message: "unable to create answer" });
	}
};

export const updateAnswer: RequestHandler = async (req, res) => {
	try {
		const answerId = parseInt(req.params.id);
		const { content } = req.body;

		await Answer.update({ id: answerId }, { content });

		res.send({ message: "update answer!" });
	} catch (error) {
		res.send({ message: "unable to update answer!" });
	}
};

export const deleteAnswer: RequestHandler = async (req, res) => {
	try {
		const answerId = parseInt(req.params.id);

		await Answer.delete({ id: answerId });

		res.send({ message: "answer successfully delete!" });
	} catch (error) {
		res.send({ message: "unable to delete answer!" });
	}
};
