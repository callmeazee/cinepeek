const mongoose = require('mongoose')

const URI = process.env.MONGO_URI

async function connectTodb() {
     try {
             await mongoose.connect(URI);
             console.log("connected to db successfully");
       
     } catch (error) {
          console.error('failed to connect',error.message)
  }
}
module.exports = connectTodb