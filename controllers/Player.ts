import { Request, Response } from "express";
import Player from "../models/playerModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type PlayerProps = {
  nickname: string;
  email: string;
  password: string;
};

type PlayerPropsDatabase = {
  cd_player: number;
  nickname_player: string;
  total_victory: number;
};

export const loginPlayer = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { emailAlreadyExists } = await ifEmailExists(email);

  try {
    if (!emailAlreadyExists) {
      res.json({ message: "Usuario não encontrado", error: true });
      return;
    }

    const player: any = await Player.findAll({
      where: {
        email_player: email,
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

const ifEmailExists = async (email: string) => {
  try {
    const player = await Player.findAll({
      where: {
        email_player: email,
      },
    });
    if (player[0] == null) {
      return {
        emailAlreadyExists: false,
      };
    } else {
      return {
        emailAlreadyExists: true,
      };
    }
  } catch (err: any) {
    throw new Error("Erro");
  }
};

export const signUpPlayer = async (req: Request, res: Response) => {
  const { nickname, email, password }: PlayerProps = req.body;

  const { emailAlreadyExists } = await ifEmailExists(email);

  if (emailAlreadyExists) {
    res.statusCode = 400;
    res.json({ message: "Email já cadastrado", error: true });
    return;
  }

  const playerId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await Player.create({
      cd_player: playerId,
      nickname_player: nickname,
      email_player: email,
      password_player: hashedPassword,
      total_victory: 0,
    });
    res.json({ message: `Cadastro feito com sucesso`, error: false });
  } catch (err: any) {
    res.json({ message: `err: ${err.message}` });
  }
};
