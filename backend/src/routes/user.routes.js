const express = require('express')

const userRouter = express.Router()
const userController = require('../controllers/user.controller')

const protect = require('../middleware/auth.middleware')

userRouter.post('/favorites', protect, userController.addFavorite)

userRouter.get('/favorites', protect, userController.getFavorites)

userRouter.delete('/favorite/:id', protect, userController.removeFavorites)

     

module.exports = userRouter