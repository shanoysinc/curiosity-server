import { Router } from "express";
import {
	createQuestion,
	deleteQuestion,
	fetchquestions,
	updateQuestion,
} from "../../controller/question/question.controller";

const router = Router();

router.get("/", fetchquestions);
router.post("/", createQuestion);
router.patch("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
