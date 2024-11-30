import express from 'express'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    allowedHeaders: ['Authorization'],
    origin: '',
  }),
)

app.listen(app.get('port'), () => {
  console.log(`Server is running: http://localhost:${app.get('port')}/`)
})
