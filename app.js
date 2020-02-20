// simple weather application

const express = require('express')
var cors = require('cors')
var helmet = require('helmet')
var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('db/data.sqlite')

const app = express()
const port = 3000

app.use(cors())
app.use(helmet())
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title: 'Počasí - grafy', message: 'Přehled počasí' }));

app.get('/weather', (req, res) => {
    db.serialize(function () {
        db.all('SELECT ID, Date, Temp FROM temperature ORDER BY date(Date) DESC LIMIT 24', function (err, row) {
            // console.log(err, row);
            res.json({temperature : row});
        })
      })
      
      // db.close()
    
});

app.post('/weather', (req, res) => res.render('index', { title: 'Počasí - grafy', message: 'Přehled počasí' }));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
