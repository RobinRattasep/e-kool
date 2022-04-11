const express = require('express');
const app = express();
const path = require('path');
var connection = require('./db')
var cookieParser = require('cookie-parser')
const crypto = require('crypto')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.render('index');
});

app.get("/login", function (req, res) {
    res.render('index');
});

app.get("/competition", function (req, res) {
    res.render( 'competition');
});


app.listen(3000);


app.post('/authentication', function(req, res, next) {
    var username = req.body.uname;
    var password = req.body.psw;
    console.log('SELECT * FROM accounts WHERE kasutajanimi = ? AND parool = ?', [username, password])
    console.log(req.body)
    var sess_id = crypto.randomBytes(20).toString('hex');
    connection.query('SELECT * FROM accounts WHERE kasutajanimi = ? AND parool = ?', [username, password], function(err, rows, fields) {
        if(err) throw err
// if user not found
        if (rows.length <= 0) {
            console.log('Unsuccesful')
            res.redirect('/')
        }
        else { // if user found
            console.log('Successful')
            res.cookie('sess_id', sess_id)
            res.redirect('/');
            connection.query('INSERT INTO cookies (user_id, sess_id) VALUES((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?) ON DUPLICATE KEY UPDATE user_id = (SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), sess_id = ?', [username, password, sess_id, username, password, sess_id], function(err, rows, fields) {
                if(err) throw err
            })
        }
    })
})
app.get('/grades', function(req, res, next) {
    var cookie = req.cookies.sess_id;
    console.log(cookie)
    connection.query('SELECT b.aine_nimi, a.hinne, a.kommentaar FROM hinded a INNER JOIN ained b ON a.aine_id = b.aine_id WHERE a.opilase_id = (SELECT user_id from cookies WHERE sess_id = ?)', [cookie], function(err, rows, fields) {
    console.log(rows)
        if(err) throw err
// if user not found
        if (rows.length <= 0) {
            console.log('No rows')
            res.redirect('/grades')
        }
        else { // if user found
            console.log('Rows found!')
            // map courses to grades for that course
            const output = Object.entries(rows.reduce((a, {aine_nimi, hinne}) => (a[aine_nimi] = (a[aine_nimi] || []).concat(hinne), a), {})).map(([aine_nimi, hinne]) => ({aine_nimi, hinne}));
            console.log(output)
            // map courses to avg grade for that course
            var averages = [...rows
                .reduce((map, { aine_nimi, hinne }) => map.set(aine_nimi, [...(map.get(aine_nimi) || []), hinne]), new Map) ]
                .map(([aine_nimi, hinne]) => ({ aine_nimi, hinne: hinne.reduce((sum, val) => sum + val, 0) / hinne.length }));
            res.render('grades', {
                ained: averages,
                hinded: output
            });

        }
    })
})
