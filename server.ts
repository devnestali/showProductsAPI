import 'dotenv/config'

import express from 'express'
import routes from './src/routes/index.ts'
import cookieParser from 'cookie-parser'

const app = express()

const PORT = 3333

app.use(express.json())

app.use(cookieParser())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})