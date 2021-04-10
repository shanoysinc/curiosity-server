import { Router } from "express";
import {
	getUserQuestions,
	getUserAnswers,
} from "../../controller/user/user.controller";

const router = Router();

router.get("/user-answers", getUserAnswers);

router.get("/user-questions", getUserQuestions);

export default router;
