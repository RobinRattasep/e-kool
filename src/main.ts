const express = require('express');
const app = express();
const path = require('path');
var connection = require('./db')


app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(3000);


app.get('/authentication', function(req, res, next) {
    var username = req.query.uname;
    var password = req.query.psw;
    console.log('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password])
    console.log(req.query)
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(err, rows, fields) {
        if(err) throw err
// if user not found
        if (rows.length <= 0) {
            console.log('Unsuccesful')
            res.redirect('/')
        }
        else { // if user found
            console.log('Successful')
            res.redirect('/');
        }
    })
})