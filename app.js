// Boilerplate with Express and Prismic
// express: 4.18.1
// @prismicio/client: 6.6.2
// @prismicio/helpers: 2.3.2

require('dotenv').config()
//console.log(process.env) // remove this after you've confirmed it working
const express = require('express')

const path = require('path')
const app = express()
const port = 3000

// node-fetch is used to make network requests to the Prismic Rest API. 
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const prismic = require('@prismicio/client')
const prismicH = require('@prismicio/helpers')
const fetch = require('node-fetch')

const endpoint = process.env.PRISMIC_ENDPOINT
const client = prismic.createClient(endpoint, { fetch })

const handleLinkResolver = (doc) => {
  // if (doc.type === 'page') return `/${doc.lang}/${doc.uid}`
  // if (doc.type === 'homepage') return `/${doc.lang}`
  return '/'
}

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
    linkResolver: handleLinkResolver,
  }
  next()
})


app.set('views', path.join(__dirname, 'views'))
// Set PUG as templating engine
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")));

// Query for the homepage path.
app.get('/', async (req, res) => {
  // Here we are retrieving the document from your API endpoint
  const document = await client.get({ predicates: [ prismic.predicate.at("document.type", "accueil")]}).then( 
    response => {
      // Destructuring assignment
      const { results } = response;
      [ accueil ] = results;
      console.log(accueil.data.menu_navigation);
      res.render('pages/home')
    })
  }
)

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