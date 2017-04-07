//Main starting point for our server app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup
//this creates a db with the name auth
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
// Morgan and bodyParser are middleWare
// Morgan is a loggin framework
app.use(morgan('combined'));
app.use(bodyParser.json({
    type: '*/*'
}));
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app); 
server.listen(port);
console.log('Server listening on:', port);
