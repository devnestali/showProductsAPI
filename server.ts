import 'dotenv/config'

import express from 'express'
import routes from './src/routes/index.ts'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const PORT = 3333

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})