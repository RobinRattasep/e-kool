const express = require('express');
const app = express();
const path = require('path');
var connection = require('./db')
var cookieParser = require('cookie-parser')
const crypto = require('crypto')
const alert = require("alert")
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

app.get("/studentregister", function (req, res) {
    res.render( 'studentregister');
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
            res.redirect('/grades');
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
            if(err) throw err
// if user not found
        if (rows.length <= 0) {
            console.log('No rows')
            res.render('lessons')


        }
        else { // if user found
            console.log('Rows found!')
            connection.query('SELECT opilase_nimi from opilased WHERE opilase_id = (SELECT user_id from cookies WHERE sess_id = ?)', [cookie], function(err, name, fields) {

            // map courses to grades for that course
            const output = Object.entries(rows.reduce((a, {aine_nimi, hinne}) => (a[aine_nimi] = (a[aine_nimi] || []).concat(hinne), a), {})).map(([aine_nimi, hinne]) => ({aine_nimi, hinne}));
            // map courses to avg grade for that course
            var averages = [...rows
                .reduce((map, { aine_nimi, hinne }) => map.set(aine_nimi, [...(map.get(aine_nimi) || []), hinne]), new Map) ]
                .map(([aine_nimi, hinne]) => ({ aine_nimi, hinne: hinne.reduce((sum, val) => sum + val, 0) / hinne.length }));
            console.log(averages)

            res.render('grades', {
                ained: averages,
                hinded: output,
                nimi: name,

            });
            })

        }
    })
})

app.post("/studentregister", function (req, res) {
    var sess_id = crypto.randomBytes(20).toString('hex');
    console.log(req.body.mata)
    connection.query('INSERT INTO accounts (kasutajanimi, parool) VALUES (? , ?)', [req.body.username, req.body.psw])

    // If student learns math
    if(req.body.mata !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.mata])
    }
    // if student learns estonian
    if(req.body.eta !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.eta])
    }
    // if student learns english
    if(req.body.inka !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.inka])
    }
    // if student learns music
    if(req.body.muusika !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.muusika])
    }
    // if student learns art
    if(req.body.kunst !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.kunst])
    }
    // if student learnshistory
    if(req.body.ajalugu !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.ajalugu])
    }
    // if student learns chemistry
    if(req.body.keemia !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.keemia])
    }
    // if student learns biology
    if(req.body.bio !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.bio])
    }
    // if student learns geographics
    if(req.body.geo !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.geo])
    }
    // if student learns writing
    if(req.body.kirjandus !== undefined) {
        connection.query('INSERT INTO opilaste_ained (opilase_id, aine_id) VALUES ((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?)', [req.body.username, req.body.psw, req.body.kirjandus])
    }


    //kas on opetaja
    if(req.body.opetaja == "supreme") {
        connection.query('INSERT INTO opilased (opilase_nimi, klass, kooli_id, opetaja) VALUES(?, ?, ?, 1)', [req.body.firstname+' '+req.body.lastname, req.body.class, req.body.school])
    } else {
        connection.query('INSERT INTO opilased (opilase_nimi, klass, kooli_id) VALUES(?, ?, ?)', [req.body.firstname+' '+req.body.lastname, req.body.class, req.body.school])
    }
    connection.query('INSERT INTO cookies (user_id, sess_id) VALUES((SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), ?) ON DUPLICATE KEY UPDATE user_id = (SELECT kasutaja_id FROM accounts WHERE kasutajanimi = ? AND parool = ?), sess_id = ?', [req.body.username, req.body.psw, sess_id, req.body.username, req.body.psw, sess_id], function(err, rows, fields) {
       if(err) throw err
    })
        res.redirect( '/');


});



app.get("/lessons", function (req, res) {
    var cookie = req.cookies.sess_id;
    console.log(cookie)
    connection.query('SELECT aine_nimi FROM ained INNER JOIN opilaste_ained ON ained.aine_id = opilaste_ained.aine_id WHERE opilaste_ained.opilase_id = (SELECT user_id from cookies WHERE sess_id = ?)', [cookie], function(err, rows, fields) {
        var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
        res.render('lessons', {
            ained: resultArray
        });
    })
})


