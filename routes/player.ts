import express from 'express'
import { loginPlayer, signUpPlayer } from '../controllers/Player';


export const loginRouter = express.Router();

export const signUpRouter = express.Router();

loginRouter.post("/", loginPlayer);
signUpRouter.post("/", signUpPlayer);