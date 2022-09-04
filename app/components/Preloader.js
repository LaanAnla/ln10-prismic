import Component from "classes/Component"
import TextIntro from "utils/text"
import each from 'lodash/each'
import GSAP from 'gsap'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        videos: document.querySelectorAll('video'),
        fading: document.querySelector('.fading'),
        images: document.querySelectorAll('img.preloaded')
      }
    })

    this.textAnimation = new TextIntro(
      this.text = document.querySelectorAll(".preloader__text"),
      this.contact = null,
      this.second = null
    );

    this.length = 0

    this.createLoader()

  }

  createLoader() {

    if(window.location.pathname == '/') {
      each(this.elements.videos, element => {
  
        let xhrReq = new XMLHttpRequest()
        xhrReq.open('GET', element.src, true)
        xhrReq.responseType = 'blob'
        
        xhrReq.onload = _ => {
            if (xhrReq.status === 200) {
                let vid = URL.createObjectURL(xhrReq.response);
                element.src = vid
            }
        }
        xhrReq.onerror = _ => {
            console.log('err' ,arguments);
        }
        xhrReq.onprogress = e => {
            if(e.lengthComputable) {
              
                let percentage = ((e.loaded/e.total)*100|0) + '%'
                
                this.elements.number.innerHTML = percentage
                if( percentage === '100%') {
                  this.onLoaded()
                }
            }
        }
        xhrReq.send()
      })
    } 
    
    if(window.location.pathname == "/antonin" || window.location.pathname == "/propos") {
      // Preloading des images except /
      if(this.elements.images.length > 0) {
        each(this.elements.images, element => {
          element.onload = _ => this.onAssetLoaded(element)
          element.src = element.getAttribute('data-src')
          element.crossOrigin = 'anonymous'
        })
      } 
    } 
    
    if(window.location.pathname == "/contact" || window.location.pathname == "/manon" || window.location.pathname == '/ninon') {
      this.elements.number.innerHTML = `${100}%`
        this.onLoaded()
    }
  }

  onAssetLoaded() {
    this.length += 1
    const percentage = this.length / this.elements.images.length
    this.elements.number.innerHTML = `${Math.round(percentage * 100)}%`

    if( percentage === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise( resolve => {
      this.animateOut = GSAP.timeline()

      this.animateOut.to(this.element, {
        y: '100%',
        ease: "power2",
        duration: 0.8,
        delay: 3
      })

      this.animateOut.to(this.elements.title, {
        autoAlpha: 0,
        duration: 1
      }, 2.3)

      this.animateOut.to(this.elements.number, {
        autoAlpha: 0,
        duration: 1
      }, 2.3)

      this.animateOut.from(this.elements.fading, {
        y: -100,
        duration: 0.8
      }, 2.8)

      this.animateOut.call( _ => {
        this.emit('completed')
      })
    })  
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}