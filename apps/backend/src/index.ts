import app from './app'
import connectDB from './db'

app.listen(app.get('port'), () => {
  console.clear()
  console.log(`Server is running: http://localhost:${app.get('port')}/`)
  connectDB({
    uri: String(app.get('mongo_uri')),
    user: String(app.get('mongo_user')),
    pass: String(app.get('mongo_pass')),
    db: String(app.get('mongo_db')),
  })
})
