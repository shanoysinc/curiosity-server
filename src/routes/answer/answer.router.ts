import { Router } from "express";
import {
	createAnswer,
	updateAnswer,
	deleteAnswer,
	getAnswers,
} from "../../controller/answer/answer.controller";
import { answerPermission } from "../../middleware/answerPermission";

const router = Router();

router.get("/:id", getAnswers);
router.post("/:id", createAnswer);
router.patch("/:id", answerPermission, updateAnswer);
router.delete("/:id", answerPermission, deleteAnswer);

export default router;
