import { Request, Response } from "express";
import Player from "../models/playerModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type PlayerProps = {
  nickname: string;
  password: string;
};

type PlayerPropsDatabase = {
  cd_player: number;
  nickname_player: string;
  total_victory: number;
};

const ifPlayerExists = async (nickname: string) => {
  try {
    const player = await Player.findAll({
      where: {
        nickname_player: nickname,
      },
    });
    if (player[0] == null) {
      return {
        playerAlreadyExists: false,
      };
    } else {
      return {
        playerAlreadyExists: true,
      };
    }
  } catch (err: any) {
    throw new Error("Erro");
  }
};

export const loginPlayer = async (req: Request, res: Response) => {
  const { nickname, password } = req.body;

  const { playerAlreadyExists } = await ifPlayerExists(nickname);

  try {
    if (!playerAlreadyExists) {
      res.json({ message: "Usuario não encontrado", error: true });
      return;
    }

    const player: any = await Player.findAll({
      where: {
        nickname_player: nickname,
      },
    });
    const passwordMath: boolean = await bcrypt.compare(
      password,
      player[0].password_player
    );

    if (passwordMath) {
      const { nickname_player, cd_player, total_victory }: PlayerPropsDatabase =
        player[0];
      const token = jwt.sign({ cd_player }, `${process.env.JWT_KEY}`, {
        expiresIn: "1h",
      });

      res.json({
        token: token,
        id: cd_player,
        nickname: nickname_player,
        total_victory: total_victory,
      });
    } else {
      res.statusCode = 401;
      res.json({ message: "Senha inválida", error: true });
      return;
    }
  } catch (err) {
    res.json(err);
  }
};

export const signUpPlayer = async (req: Request, res: Response) => {
  const { nickname, password }: PlayerProps = req.body;

  const { playerAlreadyExists } = await ifPlayerExists(nickname);

  if (playerAlreadyExists) {
    res.status(409).json("Usuário já existe");
    return;
  }

  const playerId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await Player.create({
      cd_player: playerId,
      nickname_player: nickname,
      password_player: hashedPassword,
      total_victory: 0,
    });
    res.status(201).json("Cadastro feito com sucesso");
  } catch (err: any) {
    res.status(500).json(`${err}`);
  }
};
