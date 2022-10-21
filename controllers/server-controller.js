import db from '../db/connection.js'

const dbConnect = async () => {
  console.log('Connecting...')
  
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database!:', error)
  }
}

export default dbConnect
