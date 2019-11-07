const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
// let data = [{ id: 1, string: "string 1" }]

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
const write = (data) => fs.writeFileSync('db.json', JSON.stringify(data, null, 3))

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('list', { data: data }))

app.get('/add', (req, res) => res.render('add'))

app.get('/edit/:id', (req, res) => res.render('edit', {data: data}))

app.post('/add', (req, res) => {
    data.push({
        id: req.body.id,
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    })
    write(data);
    // fs.writeFileSync('db.json', JSON.stringify(data, null, 3))
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    data.splice(id, 1);
    write(data);
    res.redirect('/')
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id
    // data.splice(id, 1);
    data[id] = ({
        id: req.body.id,
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    })
    write(data);
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('web ini berjalan di port 3000');
})