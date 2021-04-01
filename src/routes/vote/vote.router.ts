import { Router } from "express";
import { updateVote } from "../../controller/vote/vote.controller";

const router = Router();

router.patch("/:id", updateVote);

export default router;
