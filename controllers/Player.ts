import { Request, Response } from "express";
import Player from "../models/playerModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface PlayerProps {
  nickname: string;
  email: string;
  password: string;
}

export const loginPlayer = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const player: any = await Player.findAll({
      where: {
        email_player: email,
      },
      
    })
    if (res.status(200) && player[0] == null) {
      res.json({ message: "Usuario não encontrado", error: true });
      return;
    }
    const passwordMath = await bcrypt.compare(password, player[0].password_player)

    if(passwordMath){
      const { nickname_player, cd_player, total_victory }: any = player[0];
      res.json({
        id: cd_player,
          nickname: nickname_player,
          total_victory: total_victory,
        });
    }else{
      res.json({ message: "Senha inválida", error: true });
      return;
    }

  }catch(err){
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
      return false;
    } else {
      return true;
    }
  } catch (err: any) {
    throw new Error("Erro");
  }
};

export const signUpPlayer = async (req: Request, res: Response) => {
  const { nickname, email, password }: PlayerProps = req.body;
  const playerId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  //const token = serverClient.createToken(playerId)

  const IF_ALREADY_EXISTS_EMAIL = await ifEmailExists(email);

  if(IF_ALREADY_EXISTS_EMAIL){
    res.json({ message: "Email já cadastrado", error: true });
    res.status(400)
    return;
  }

  try {
    await Player.create({
      cd_player: playerId,
      nickname_player: nickname,
      email_player: email,
      password_player: hashedPassword,
      total_victory: 0
    });
    res.json({ message: `Cadastro feito com sucesso`, error: false});

  } catch (err: any) {
    res.json({ message: `err: ${err.message}`});
  }
};
