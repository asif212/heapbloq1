const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const checkAuth = require('./middleware/check-auth');

const userRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const blogRoute = require('./routes/blog');
const masterController = require('./controllers/master');
const path1 = require("path");
const path = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@dds347467.mlab.com:47467/bloging021';
mongoose.connect('mongodb://knotty_bro:Only4mongoDB@ds347467.mlab.com:47467/bloging021', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//logging and body parsing
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handling CORS errors
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        console.log('option state');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept, Authorization', {
            useMongoClient: true
        });
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
        res.status(200).json({});
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept, Authorization', {
            useMongoClient: true
        });
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
        next();
    }
})

//Routes
// app.use(express.static(path1.join(__dirname, 'dist/browser')));


// error handling

// app.all('/*', function (req, res, next) {
//     //req.session.cookie.originalMaxAge = sessionExpiryTime;
//     //req.session.cookie.expires = new Date().getTime() + sessionExpiryTime;
//     res
//             .status(200)
//             .set({'content-type': 'text/html; charset=utf-8'})
//             .sendFile(path1.join(__dirname, 'dist/browser/index.html'));
// });


app.use('/user', userRoute);
app.use('/profile', profileRoute);
app.use('/blog', blogRoute);
app.use('/master/updateConf', masterController.setAppConfiguration);
app.use('/master/getConf', masterController.appConfiguration);
app.use('/helloworld', (req, res, next) => {
    res.status(200).json({
        message: "App is working fine!"
    })
});

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});

module.exports = app;