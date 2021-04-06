import { Router } from "express";
import { fetchquestions } from "../../controller/newsFeed/newsFeed.controller";
const router = Router();

router.get("/", fetchquestions);

export default router;
