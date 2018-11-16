const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


// Express configuration
const app = express()
const config = require('../constant');
const apiRoutes = {
    user: require('./user'),
    login: require('./login'),
    verify: require('./verify')
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.CROSS_ORIGIN_ACCESS_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())
app.listen(8080)


// Mongoose configuration

mongoose.connect('mongodb://localhost:27017/Project', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Established Succeeded");
});

app.post('/signup', apiRoutes.user.createUser);

app.post('/login', apiRoutes.login.entryCheck);

app.get('/verify/:id', apiRoutes.verify.verifyUser);

