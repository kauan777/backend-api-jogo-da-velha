import express from 'express'
import { loginPlayer, signUpPlayer } from '../controllers/Player';

const router = express.Router();

router.post("/login", loginPlayer);
router.get("/signup", signUpPlayer);

export default router