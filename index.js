const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;
const socialRoutes = require("@colyseus/social/express").default;

const MyRoom = require('./MyRoom').MyRoom;

const port = process.env.PORT || 2567;
const app = express()

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

// register your room handlers
gameServer.register('my_room', MyRoom);

// register @colyseus/social routes
app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)
