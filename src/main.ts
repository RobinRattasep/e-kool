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


app.post('/authentication', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
        if(err) throw err
// if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Please correct enter email and Password!')
            res.redirect('/login')
        }
        else { // if user found
            res.redirect('/home');
        }
    })
})