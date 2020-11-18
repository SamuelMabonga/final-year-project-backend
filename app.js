// import dotenv
require('dotenv').config();
// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// import passport
const passport = require('passport');
// import cors
const cors = require('cors');

// Create a port variable
const port = process.env.PORT || 4000;

// import keys
// const keys = require('./config/myDbUrl')

// Database Key
const DB = process.env.MONGO_URL;

// IMPORT ROUTES
// import signup/login route
const signuproute = require('./routes/signUproute');
// import questions route
const questionsRoute = require('./routes/questions');
// import management routes
const managementRoute = require('./routes/management')

// create an express app
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// use cors
app.use(cors())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// use express.json middleware
app.use(express.json());
// express.static to enable us access static files
app.use(express.static('public'));

// // LOCAL DATABASE
// //connect to the database
// mongoose.connect(process.env.eduDb, {useUnifiedTopology:true, useNewUrlParser:true})

// // CLOUD DATABASE
// connecting to the database
mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('     MongoDb Connected!!! (*_*) '));

// Passport Middleware
app.use(passport.initialize());







// config for jwt token
require('./strategies/jwtwebtoken')(passport);

// ROUTING ROUTING ROUTING //
// use auth routes
app.use('/api', signuproute);
// use questions routes
app.use('/api/questions', cors(), questionsRoute);
// use management routes
app.use('/api/management', cors(), managementRoute)

// check port
app.listen(port, () => {
  console.log(`listening from http://localhost:${port}`);
});
