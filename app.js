// require modules
const http = require('http');
const express = require('express');
const db = require('./model/db')

// set up server
const app = express();
const server = http.createServer(app)

// include middleware (static files, json, urlencode)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


// listen for requests
server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});