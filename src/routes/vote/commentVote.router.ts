import { Router } from "express";
import {
	commentDownVote,
	commentUpVote,
} from "../../controller/vote/commentVote.controller";

const router = Router();

router.patch("/comment/upvote/:id", commentUpVote);
router.patch("/comment/downvote/:id", commentDownVote);

export default router;
