const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Databese Connected...');
    
  } catch (error) {
    console.log('MongoDb Error: ', error)
  }
}

module.exports = connectDb
