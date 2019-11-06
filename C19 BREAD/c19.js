const express = require('express');
const path = require('path');
let data = [{nama: "Ridzi", umur: 17}]
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/',(req, res) => res.render('list', {data: data}))

app.get('/add', (req, res) => res.render('add'))

app.post('/add', (req, res) => {
    data.push({nama: req.body.nama, umur: req.body.umur})
    res.redirect('/')
})

app.get('delete/:id', (req, res) => {
    let id = req.params.id
    data.splice(id, 1);
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('web ini berjalan di port 3000');
})