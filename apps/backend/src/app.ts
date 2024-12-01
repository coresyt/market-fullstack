import express from 'express'
import cors from 'cors'
import getEnvs from './env'
import morgan from 'morgan'

import productsRouter from './routes/products.routes'
import authRouter from './routes/users.routes'
const app = express()

app.set('port', getEnvs.PORT)
app.set('cors_uris', String(getEnvs.CORS_URIS).split(','))
app.set('mongo_pass', getEnvs.MONGO.PASS)
app.set('mongo_user', getEnvs.MONGO.USER)
app.set('mongo_uri', getEnvs.MONGO.URI)
app.set('mongo_db', getEnvs.MONGO.DB)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  cors({
    allowedHeaders: ['Authorization'],
    origin: app.get('cors_uri'),
  }),
)

app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)

export default app
