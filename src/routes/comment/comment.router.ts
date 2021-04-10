import { Router } from "express";
import {
	getComments,
	createComment,
	updateComment,
	deleteComment,
} from "../../controller/comment/comment.controller";
import { commentPermission } from "../../middleware/commentPermission";

const router = Router();

router.get("/:id", getComments);
router.post("/:id", createComment);
router.patch("/:id", commentPermission, updateComment);
router.delete("/:id", commentPermission, deleteComment);

export default router;
