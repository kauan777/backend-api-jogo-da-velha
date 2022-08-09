import express, { Request, Response } from 'express'
import routerPlayer from './routes/player'
import 'dotenv/config'
const app = express()

app.get('./', (req: Request, res: Response) => {
    res.send("Hello world")
})

app.use(express.json())

app.use("/", routerPlayer);

app.listen(3001, () => {
    console.log("Funcionando!!")
})