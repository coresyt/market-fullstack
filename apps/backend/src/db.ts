import { connect } from 'mongoose'

export default async function connectDB({
  uri,
  user,
  pass,
  db,
}: {
  uri: string
  user: string
  pass: string
  db: string
}) {
  const uri_connection = uri
    .replace('<user>', user)
    .replace('<pass>', pass)
    .replace('<db>', db)

  const { connection } = await connect(uri_connection)
  const { readyState } = connection

  if (readyState === 1) {
    console.log('Database connected successfully')
  }
}
