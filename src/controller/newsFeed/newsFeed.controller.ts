import { RequestHandler } from "express";
import { Question } from "../../entity/Question";
import { toCamelCase } from "../../util/toCamelCase";

export const fetchquestions: RequestHandler = async (req, res) => {
	try {
		const questions = await Question.query(`SELECT
		DISTINCT ON (questions.id) questions.id,
		questions.title AS question_title,
		questions.created_at AS questionCreatedAt,
		questions.updated_at AS question_updated_at,
		users.id AS user_id,
		users.first_name AS answer_creator_first_name,
		users.last_name AS answer_creator_last_name,
		users.profession AS answer_creator_profession,
		answers.id AS answer_id,
		answers.content AS answer_content,
		answers.created_at AS answer_created_at,
		answers.updated_at AS answer_updated_at,
		(SELECT SUM(votes.value) AS votes FROM votes WHERE answers.id = votes.answer_id),
		(SELECT COUNT(*) AS number_of_comments FROM comments WHERE answers.id = comments.answer_id)
		FROM questions
		LEFT JOIN answers ON questions.id = answers.question_id
		LEFT JOIN users ON  users.id  = answers.user_id
		LEFT JOIN votes ON answers.id = votes.answer_id
		ORDER  BY questions.id, answers.created_at DESC NULLS LAST, answers.id;`);

		const modQuestions = toCamelCase(questions);
		res.send({ questions: modQuestions });
	} catch (error) {
		console.log(error);

		res.send({ message: "unable to retrieve question!" });
	}
};
