const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers'); // May have to seperate controllers into specific files later

userRouter.get('/test', (req, res) => res.sendStatus(200));

module.exports = userRouter;
