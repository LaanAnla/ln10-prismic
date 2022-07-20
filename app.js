const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")))
app.get('/', (req, res) => {
  // res.send('<strong>Hello World!</strong>')
  // utilisation de Pug
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})