import express from 'express'
import routes from './routes'

const PORT = 4000
const app = express()

app.use(express.json())
app.use(routes)

const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
  console.log(process.env.DATABASE_URL)
})
