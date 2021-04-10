import { Router } from "express";
import {
	createQuestion,
	deleteQuestion,
	fetchQuestion,
	// updateQuestion,
} from "../../controller/question/question.controller";
import { questionPermission } from "../../middleware/questionPermission";
const router = Router();

router.get("/:id", fetchQuestion);
router.post("/", createQuestion);
// router.patch("/:id", updateQuestion);
router.delete("/:id", questionPermission, deleteQuestion);

export default router;
