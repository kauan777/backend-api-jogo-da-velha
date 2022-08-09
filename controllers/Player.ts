import { Request, Response } from "express";
import Player from "../models/playerModel";


export const loginPlayer = async (req: Request, res: Response) => {

    res.json({teste: "Usuario logado"})

}

export const signUpPlayer = async (req: Request, res: Response) => {

    res.json({teste: "Usuario cadastrado"})

}