import 'dotenv/config'

function get() {
  if (
    !process.env.CORS_URIS ||
    !process.env.PORT ||
    !process.env.SECRET_KEY ||
    !process.env.MONGO_URI ||
    !process.env.MONGO_PASS ||
    !process.env.MONGO_USER ||
    !process.env.MONGO_DB
  ) {
    throw new Error('Missing environment variables')
  }

  return {
    CORS_URIS: process.env.CORS_URIS,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    MONGO: {
      URI: process.env.MONGO_URI,
      PASS: process.env.MONGO_PASS,
      USER: process.env.MONGO_USER,
      DB: process.env.MONGO_DB,
    },
  }
}

export default get()
