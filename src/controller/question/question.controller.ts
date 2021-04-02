import { RequestHandler } from "express";
import { Question } from "../../entity/Question";
import { Vote } from "../../entity/Vote";

export const fetchquestions: RequestHandler = async (req, res) => {
	try {
		const user = req.user;
		const questions = await Question.find({
			relations: ["answers"],
		});

		res.send({ questions });
	} catch (error) {
		res.send({ message: "unable to retrieve question!" });
	}
};

export const createQuestion: RequestHandler = async (req, res) => {
	try {
		const { title } = req.body as Question;
		const user = req.user;

		const newQuestion = Question.create({ title, user });
		await newQuestion.save();

		res.send({ question: newQuestion });
	} catch (error) {
		res.send({ message: "unable to create question!" });
	}
};

export const updateQuestion: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { title } = req.body as Question;

		const updatedquestion = await Question.createQueryBuilder("questions")
			.update(Question)
			.set({ title })
			.where("id = :id", { id })
			.returning("*")
			.execute()
			.then((res) => res.raw[0]);

		res.send({ question: updatedquestion });
	} catch (error) {
		res.send({ message: "unable to update question!" });
	}
};

export const deleteQuestion: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		await Question.delete({ id });
		res.send({ message: "question successfully deleted!" });
	} catch (error) {
		res.send({ message: "unable to delete question!" });
	}
};
