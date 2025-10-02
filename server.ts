import 'dotenv/config'

import express from 'express'
import routes from './src/routes/index.ts'

const app = express()

const PORT = 3333

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})