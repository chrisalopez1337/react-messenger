const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const isEmail = (str) => str.indexOf('@') > -1 ? true : false;

module.exports = {
    createUser: (req, res) => {
        const { username, email, password } = req.body;
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                const data = { username, email, password: hash };
                models.createUser(data, (err, docs) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        });
    },

    getUser: (req, res) => {
        const { searchItem } = req.params;
        // Find if its an email or not
        let query;
        if (isEmail(searchItem)) {
            query = { email: searchItem };
        } else {
            query = { username: searchItem };
        }
        // Query the db.
        models.getUser(query, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.status(200).send(docs[0]);
            }
        });
    },

    validateUser: (req, res) => {
        const { username, password } = req.body;
        // Get the stored hashed password.
        models.getUser({ username }, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                const hash = docs[0].password;
                // Compare the password
                bcrypt.compare(password, hash, (err, result) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        const json = { validated: result };
                        res.status(200).send(json);
                    }
                });
            }
        });
    },

    searchUsers: (req, res) => {
        const { search } = req.params;
        const query = { username: { $regex: search } };
        models.searchUsers(query, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.status(200).send(docs);
            }
        }); 
    },

    sendFriendRequest: (req, res) => {
        // When we send a friend request we need to
        // 1) Update the user sending the requests contacts object to have friend_status = 'outbound'
        // 2) Update the user recieving the request contacts object to have friend_status = 'inbound'
        const { userSending, userRecieving, userSendingContacts } = req.body;
        
        // First update the user that is sending the friend request
        const firstQuery = { username: userSending };
        const newUserSendingContacts = [...userSendingContacts, { username: userRecieving, friend_status: 'outbound', messages: [{}] }];
        models.updateUsersContacts(firstQuery, newUserSendingContacts, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                // Second update the user that is recieving the friend request

                // Fetch the users data
                const secondQuery = { username: userRecieving };
                models.getUser(secondQuery, (err, docs) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        const receivingUsersContacts = docs[0].contacts;
                        const newReceivingUsersContacts = [...receivingUsersContacts, { username: userSending, friend_status: 'inbound', messages: [{}] }];
                        models.updateUsersContacts(secondQuery, newReceivingUsersContacts, (err, docs) => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(201);
                            }
                        });
                    }
                });
            }
        });
    }
}





































