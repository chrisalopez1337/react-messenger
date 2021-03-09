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
                res.status(200).send(docs);
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
    }
}
