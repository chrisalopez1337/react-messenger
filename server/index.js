// Express app setup
const express = require('express');
const app = express();
const PORT = 3000;
// Middleware
const bodyParser = require('body-parser');
const path = require('path');
// Routers

// Serving react code
app.use(express.static(path.join(__dirname, '../client/dist')));

// Applying middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route 
app.get('/test', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`React project listening @ ${PORT}`));
