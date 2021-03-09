const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    }
}
