import express, { Request, Response } from 'express'
import { loginRouter, signUpRouter } from './routes/player'

const app = express()

app.get('./', (req: Request, res: Response) => {
    res.send("Hello world")
})

app.use(express.json())

app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

app.listen(3001, () => {
    console.log("Funcionando!!")
})