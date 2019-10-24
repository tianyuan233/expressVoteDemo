const express = require('express');
const app = express();
const server = require('http').createServer(app);

module.exports.server = server

module.exports.io = require('socket.io')(server);