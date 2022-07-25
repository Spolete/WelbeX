import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import userRouter from './routes/table.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT)