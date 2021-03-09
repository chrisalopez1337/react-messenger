const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers'); // May have to seperate controllers into specific files later

userRouter.post('/create', controllers.createUser);
userRouter.get('/:searchItem', controllers.getUser);
userRouter.post('/validate', controllers.validateUser);

module.exports = userRouter;
