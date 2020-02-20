// simple weather application

const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')
const helmet = require('helmet')
const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('db/data.sqlite')

const app = express()
const port = 3000

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title: 'Počasí - grafy', message: 'Přehled počasí' }));

app.get('/weather', (req, res) => {
    db.serialize(function () {
        db.all('SELECT ID, Date, Temp FROM temperature ORDER BY date(Date),time(Date) LIMIT 24', function (err, row) {
            // console.log(err, row);
            res.json({temperature : row});
        })
      })
      
      // db.close()
    
});

// POST akceptuje data user, payload {date: datum, temp: teplota, bar: tlak}

app.post('/weather', (req, res) => {
    var user;
    var date;
    var temp;
    var bar;
    try {
        const data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        user=data.user;
        date=data.payload.date;
        temp=data.payload.temp;
        bar=data.payload.bar;
    } catch(err) {
        res.status(500).send('Internal Server Error');
    }
    if(user != 'weatherapp') {
        res.status(403).send('Forbidden');   
    }
    else {
        var stmt = db.prepare('INSERT INTO temperature VALUES (null,?,?)');
        stmt.run(date,temp);
        stmt.finalize();
        res.status(200).send('OK');
    }
    });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
