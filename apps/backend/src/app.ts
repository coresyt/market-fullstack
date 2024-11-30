import express from 'express'
import cors from 'cors'
import getEnvs from './env'

const app = express()

app.set('port', getEnvs.PORT)
app.set('cors_uris', String(getEnvs.CORS_URIS).split(','))
app.set('mongo_pass', getEnvs.MONGO.PASS)
app.set('mongo_user', getEnvs.MONGO.USER)
app.set('mongo_uri', getEnvs.MONGO.URI)
app.set('mongo_db', getEnvs.MONGO.DB)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    allowedHeaders: ['Authorization'],
    origin: app.get('cors_uri'),
  }),
)

export default app
