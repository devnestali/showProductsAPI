import 'dotenv/config'

import express from 'express'
import routes from './src/routes/index.ts'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const PORT = 3333

app.use(cors({
  origin: 'https://show-products-aq7u81qsn-devnestalis-projects.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))

app.options('*', cors({
  origin: 'https://show-products-aq7u81qsn-devnestalis-projects.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))

app.use(express.json())

app.use(cookieParser())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})