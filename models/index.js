const { Users } = require('../database');

module.exports = {
    createUser: (data, cb) => {
        Users.create(data, cb);
    }
};
