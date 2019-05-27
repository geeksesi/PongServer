const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
const socialRoutes = require("@colyseus/social/express").default;
const mongo  =  require('mongoose');

const signup = require("./controller/signup");
const rooms = require('./rooms/Rooms');

const port = process.env.PORT || 2567;
const app = express()

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });


mongo.connect('mongodb://127.0.0.1:27017/pong', {useNewUrlParser: true, autoIndex: false});

// register your room handlers
gameServer.register('set_score', rooms.SetScore);

// register @colyseus/social routes
app.use("/", socialRoutes);


// singup
app.use("/signup/:hash", signup.signup);


// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)