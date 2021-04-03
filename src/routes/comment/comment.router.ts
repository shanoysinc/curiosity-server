import { Router } from "express";
import {
	createComment,
	updateComment,
	deleteComment,
} from "../../controller/comment/comment.controller";
import { commentPermission } from "../../middleware/commentPermission";

const router = Router();

router.post("/:id", createComment);
router.patch("/:id", commentPermission, updateComment);
router.delete("/:id", commentPermission, deleteComment);

export default router;
