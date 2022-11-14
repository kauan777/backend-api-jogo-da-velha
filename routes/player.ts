import express from "express";
import { loginPlayer, signUpPlayer, getPlayer } from "../controllers/Player";

const router = express.Router();

router.post("/login", loginPlayer);
router.post("/signup", signUpPlayer);
router.get("/player", getPlayer);

export default router;
