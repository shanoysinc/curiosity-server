import { RequestHandler } from "express";
import { Question } from "../../entity/Question";
import { createQueryBuilder } from "typeorm";
import { User } from "../../entity/User";
// import { toCamelCase } from "../../util/toCamelCase";
export const fetchQuestion: RequestHandler = async (req, res) => {
	try {
		const questionId = parseInt(req.params.id);
		const question = await Question.createQueryBuilder("question")
			.where("question.id = :id", { id: questionId })
			.leftJoinAndSelect("question.answers", "answer")
			.leftJoin(User, "user", "answer.users = user")
			.leftJoinAndSelect("answer.votes", "votes")
			.getMany();
		// .leftJoinAndSelect("answer.votes", "votes");

		res.send({ question });
	} catch (error) {
		console.log(error);

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

// export const updateQuestion: RequestHandler = async (req, res) => {
// 	try {
// 		const id = parseInt(req.params.id);
// 		const { title } = req.body as Question;

// 		const updatedquestion = await Question.createQueryBuilder("questions")
// 			.update(Question)
// 			.set({ title })
// 			.where("id = :id", { id })
// 			.returning("*")
// 			.execute()
// 			.then((res) => res.raw[0]);

// 		res.send({ question: updatedquestion });
// 	} catch (error) {
// 		res.send({ message: "unable to update question!" });
// 	}
// };

export const deleteQuestion: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		await Question.delete({ id });
		res.send({ message: "question successfully deleted!" });
	} catch (error) {
		res.send({ message: "unable to delete question!" });
	}
};
