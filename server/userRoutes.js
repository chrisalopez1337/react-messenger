const express = require('express');
const userRouter = express.Router();
const controllers = require('../controllers'); // May have to seperate controllers into specific files later

// User maintence routes
userRouter.post('/create', controllers.createUser);
userRouter.get('/:searchItem', controllers.getUser);
userRouter.post('/validate', controllers.validateUser);
userRouter.get('/search/:search', controllers.searchUsers);
// Friend request routes
userRouter.post('/friend-request/send', controllers.sendFriendRequest);
userRouter.post('/friend-request/accept', controllers.acceptFriendRequest);
// Messagin routes
userRouter.post('/messaging/send', controllers.sendMessage);


module.exports = userRouter;
