import Animation from "classes/Animation";
import GSAP from 'gsap'

export default class ImagesLeft extends Animation {
  constructor({element, elements}) {

    super({
      element,
      elements
    })
  }

  animateIn() {
    GSAP.fromTo(this.element, {
      autoAlpha: 0,
      x: '-100%'
    }, {
      x: 0,
      autoAlpha: 1,
      delay: 0.5,
      duration: 1
    })
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize() {

  }
}