require('dotenv').config()
const app = require('./src/app');
const connectToDb = require('./src/config/database')
connectToDb()




app.get("/", (req, res) => {
  res.json({ message: "Movie Platform API Running 🚀" });
});

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
     console.log(`server is runnning on ${PORT}`)
})
