const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cinepeek-frontend.onrender.com"],
    credentials: true,
  }),
);
app.use(cookieParser())



const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const movieRouter = require('./routes/movie.routes')
const TMDBRouter = require('./routes/tmdb.routes')
const favoriteRoutes = require("./routes/favorite.routes");
const adminRoutes = require('./routes/admin.routes')



app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/movies', movieRouter)
app.use('/api/tmdb', TMDBRouter )
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes)




module.exports = app