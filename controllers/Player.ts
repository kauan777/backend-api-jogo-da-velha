import { Request, Response } from "express";
import Player from "../models/playerModel";



export const loginPlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findAll({
      where: {
        email_player: req.body.email,
        password_player: req.body.password,
      },
    });
    if (res.status(200) && player[0] == null){
      res.json({ message: "Usuario não encontrado" });
      return;
    }
    const { nickname_player, total_victory }: any = player[0];

    res.json({
        nickname: nickname_player,
        total_victory: total_victory
    });
  } catch (err: any) {
    res.json({ message: err.message });
  }
};

export const signUpPlayer = async (req: Request, res: Response) => {
  res.json({ teste: "Usuario cadastrado" });
};
