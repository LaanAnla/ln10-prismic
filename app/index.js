import each from 'lodash/each'

import Preloader from 'components/Preloader'

import About from 'pages/About'
import Home from 'pages/Home'
import Contact from 'pages/Contact'
import Antonin from 'pages/Antonin'
import Ninon from 'pages/Ninon'
import Manon from 'pages/Manon'
import Galerie from 'pages/Galerie'
import Projets from 'pages/Projets'
import Menu from 'components/Menu'
import TextAnim from 'utils/textAnim'
import Silence from 'pages/Silence'
import SaintGilles from 'pages/SaintGilles'
import Monaco from 'pages/Monaco'


class App {
  constructor() {
    this.createContent()
    this.createPreloader()
    this.createPages()
    this.createMenu()
    this.addLinkListeners()
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
      about: new About(),
      home: new Home(),
      contact: new Contact(),
      antonin: new Antonin(),
      ninon: new Ninon(),
      manon: new Manon(),
      galerie: new Galerie(),
      projets: new Projets(),
      silence: new Silence(),
      saintGilles: new SaintGilles(),
      monaco: new Monaco()
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  createMenu() {
    this.menu = new Menu()
    this.menuAnimation = new TextAnim(".menu__item")
  }

  onPreloaded() {
    this.preloader.destroy()
    this.page.show()
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
      this.page.show()
      this.createMenu()
      this.addLinkListeners()

     } else {
       console.log('error')
     }
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

