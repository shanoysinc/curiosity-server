import { Router } from "express";
import {
  login,
  signup,
  verifyToken,
} from "../../controller/auth/auth.controller";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/verify-token", verifyToken);

export default router;
