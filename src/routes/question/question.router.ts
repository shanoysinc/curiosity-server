import { Router } from "express";
import {
	createQuestion,
	deleteQuestion,
	fetchquestions,
	// updateQuestion,
} from "../../controller/question/question.controller";
import { questionPermission } from "../../middleware/questionPermission";
const router = Router();

router.get("/", fetchquestions);
router.post("/", createQuestion);
// router.patch("/:id", updateQuestion);
router.delete("/:id", questionPermission, deleteQuestion);

export default router;
