import each from 'lodash/each'
import Preloader from 'components/Preloader'
import TextAnim from 'utils/textAnim'
import Menu from 'components/Menu'

import About from 'pages/About'
import Home from 'pages/Home'
import Contact from 'pages/Contact'
import Antonin from 'pages/Antonin'
import Galerie from 'pages/Galerie'
import Ninon from 'pages/Ninon'
import Manon from 'pages/Manon'
import Projets from 'pages/Projets'
import Silence from 'pages/Silence'


class App {
  constructor() {
    this.createPreloader()
    this.createContent()
    this.createPages()
    this.addEventListeners()
    this.addLinkListeners()
    this.createMenu()

    this.update()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages() {
    this.pages = {
      silence: new Silence(),
      about: new About(),
      home: new Home(),
      contact: new Contact(),
      antonin: new Antonin(),
      ninon: new Ninon(),
      manon: new Manon(),
      galerie: new Galerie(),
      projets: new Projets(),
    }

    this.page = this.pages[this.template]
    this.page.create()
    //this.onResize()
    //this.page.show()
  }

  createMenu() {
    this.menu = new Menu()
    this.menuAnimation = new TextAnim(".menu__item")
  }

  onPreloaded() {
    this.preloader.destroy()
    this.onResize()
    this.page.show() && console.log('bing')
  }

  async onChange(url) {
    await this.page.hide()
    const request = await window.fetch(url)

     if(request.status === 200) {
      const html = await request.text()
 
      const div = document.createElement('div')

      div.innerHTML = html
      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', this.template )
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()
      this.onResize()
      this.page.show()
      this.createMenu()
      
      this.addLinkListeners()

     } else {
       console.log('error')
     }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update()
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a.fetch')
   
    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link 

        this.onChange(href)
      }
    })
  }
}

new App()

