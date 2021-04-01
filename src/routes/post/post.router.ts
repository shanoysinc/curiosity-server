import { Router } from "express";
import {
	createPost,
	deletePost,
	fetchPosts,
	updatePost,
} from "../../controller/post/post.controller";

const router = Router();

router.get("/", fetchPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
