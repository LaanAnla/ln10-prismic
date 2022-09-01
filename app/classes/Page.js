import each from 'lodash/each'
import map from 'lodash/map'
import GSAP from 'gsap'
import NormalizeWheel from 'normalize-wheel'
import Prefix from 'prefix'

import Title from 'animations/Title'
import Headers from 'animations/Headers'
import Images from 'animations/Images'
import ImagesLeft from 'animations/ImagesLeft'

export default class Page {
  constructor({ 
    id,
    element,
    elements 
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,
      animationsTitles: '[data-animation="title"]',
      animationsHeaders: '[data-animation="header"]',
      animationsImages: '[data-animation="image"]',
      animationsImagesLeft: '[data-animation="image-left"]'
    }

    this.id = id
    this.transformPrefix = Prefix('transform')
    //this.positionPrefix = Prefix('position')

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)

  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

    each(this.selectorChildren, ( entry, key ) => {
      if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if(this.elements[key].length === 0 ) {
          this.elements[key] = null
        } else if(this.elements[key].length === 1 ) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.createAnimations()
  }

  createAnimations() {
    this.animation = []

    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element
      })
    })

    this.animation.push(...this.animationsTitles)

    this.animationsHeaders = map(this.elements.animationsHeaders, element => {
      return new Headers({
        element
      })
    })

    this.animation.push(...this.animationsHeaders)

    this.animationsImages = map(this.elements.animationsImages, element => {
      return new Images({
        element
      })
    })

    this.animation.push(...this.animationsImages)

    this.animationsImagesLeft = map(this.elements.animationsImagesLeft, element => {
      return new ImagesLeft({
        element
      })
    })

    this.animation.push(...this.animationsImagesLeft)
  }

  show() {
    return new Promise( resolve => {
      this.animationIn = GSAP.timeline()
    
      this.animationIn.fromTo(this.element, {
        autoAlpha: 0
      },{
        autoAlpha: 1
      })
      this.animationIn.call( () => {
        this.addEventListeners()
        resolve()
        //console.log('show')
      })
    })
  }

  hide() {
    return new Promise( resolve => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  onMouseWheel(event) {
    //console.log(event)

    const { pixelY } = NormalizeWheel(event)
    //console.log(deltaY)
    this.scroll.target += pixelY
    //console.log(this.scroll.target)
  }

  onResize() {
    if(this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }
  }

  update() {

    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)

    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.05)
    
    if(this.scroll.current < 0.01) {
      this.scroll.current = 0
    }
    if(this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
      //console.log(this.elements.wrapper.style) 
    }
  }

  addEventListeners() {
    window.addEventListener('wheel', this.onMouseWheelEvent)
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.onMouseWheelEvent)
  }
}