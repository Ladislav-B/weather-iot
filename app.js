// simple weather application

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title: 'Počasí - grafy', message: 'Přehled počasí' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
