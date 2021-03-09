const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers'); // May have to seperate controllers into specific files later

userRouter.post('/create', controllers.createUser);

module.exports = userRouter;
