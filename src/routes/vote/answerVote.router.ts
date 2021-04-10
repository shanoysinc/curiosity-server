import { Router } from "express";
import {
	answerDownVote,
	answerUpVote,
} from "../../controller/vote/answerVote.controller";

const router = Router();

router.patch("/answer/upvote/:id", answerUpVote);
router.patch("/answer/downvote/:id", answerDownVote);

export default router;
