const userRoute = require('express').Router();
const userService = require('../webServices/userController');

userRoute.post('/addUser', userService.addUser);
userRoute.post('/login', userService.login);

module.exports = userRoute;