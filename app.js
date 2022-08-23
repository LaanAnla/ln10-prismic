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

const handleLinkResolver = (document) => {
  if (document.type === 'projets') {
    return '/projets'
  } 
  if (document.type === 'antonin') {
    return '/antonin'
  }
  if (document.type === 'ninon') {
    return '/ninon'
  }
  if (document.type === 'manon') {
    return '/manon'
  } else {
    return '/'
  }
}

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.link = handleLinkResolver
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
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  console.log(footer.data.footer)
  // Here we are retrieving the document from your API endpoint
  const document = await client.get({ predicates: [ prismic.predicate.at("document.type", 'accueil')]}).then( 
    response => {
      // Destructuring assignment
      const { results } = response;
      [ accueil ] = results;
      console.log(accueil.data.navigation);
      res.render('pages/home', {
        preloader,
        footer
      })
    })
  }
)

app.get('/propos', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'about')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ about ] = results;
      console.log(about);
      res.render('pages/about', {
        preloader,
        footer
      })
    }
  )
})

app.get('/contact', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'contact')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ contact ] = results;
      console.log(contact);
      res.render('pages/contact', {
        preloader,
        footer
      })
    }
  )
})

app.get('/antonin', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'antonin')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ antonin ] = results;
      console.log(antonin);
      res.render('pages/antonin', {
        preloader
      })
    }
  )
})

app.get('/manon', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'manon')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ manon ] = results;
      console.log(manon.data.galerie);
      res.render('pages/manon', {
        preloader
      })
    }
  )
})

app.get('/ninon', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'ninon')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ ninon ] = results;
      console.log(ninon.data.social);
      res.render('pages/ninon', {
        preloader
      })
    }
  )
})

app.get('/projets', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'projets')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ projets ] = results;
      console.log(projets);
      res.render('pages/projects', {
        preloader,
        footer
      })
    }
  )
})

app.get('/galerie', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'gallerie')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ gallerie ] = results;
      console.log(gallerie);
      res.render('pages/gallery', {
        preloader,
        footer
      })
    }
  )
})

app.get('/silence', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'silence')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ silence ] = results;
      console.log(silence.data.body);
      res.render('pages/silence', {
        preloader,
        footer
      })
    }
  )
})

app.get('/monaco', async (req, res) => {

  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'monaco')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ monaco ] = results;
      console.log(monaco.data.body);
      res.render('pages/monaco', {
        preloader,
        footer
      })
    }
  )
})

app.get('/saint-gilles', async (req, res) => {
  const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')
  const document = await client.get({ predicates: [ prismic.predicate.at('document.type', 'saintgilles')]}).then(
    response => {
      // Destructuring assignment
      const { results } = response;
      [ saintgilles ] = results;
      console.log(saintgilles.data.body);
      res.render('pages/saint-gilles', {
        preloader,
        footer
      })
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})