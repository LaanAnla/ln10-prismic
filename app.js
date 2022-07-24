const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")));

//creation du routage
app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/propos', (req, res) => {
  res.render('pages/about')
})

app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

app.get('/antonin', (req, res) => {
  res.render('pages/antonin')
})

app.get('/manon', (req, res) => {
  res.render('pages/manon')
})

app.get('/ninon', (req, res) => {
  res.render('pages/ninon')
})

app.get('/projets', (req, res) => {
  res.render('pages/projects')
})

app.get('/galerie', (req, res) => {
  res.render('pages/gallery')
})

app.get('/silence', (req, res) => {
  res.render('pages/silence')
})

app.get('/monaco', (req, res) => {
  res.render('pages/monaco')
})

app.get('/saint-gilles', (req, res) => {
  res.render('pages/saint-gilles')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})