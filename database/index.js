const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/react-messenger', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('open', () => console.log('Connected to mongoDB'));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contacts: [{ username: String, interactions: Number }],
});

const Users = mongoose.model('Users', userSchema);

module.exports = { Users };
