import { Router } from "express";
import {
	createAnswer,
	updateAnswer,
	deleteAnswer,
} from "../../controller/answer/answer.controller";
import { answerPermission } from "../../middleware/answerPermission";

const router = Router();

router.post("/:id", createAnswer);
router.patch("/:id", answerPermission, updateAnswer);
router.delete("/:id", answerPermission, deleteAnswer);

export default router;
