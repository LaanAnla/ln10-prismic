import Animation from "classes/Animation";
import GSAP from 'gsap'

export default class Title extends Animation {
  constructor({element, elements}) {

    super({
      element,
      elements
    })
  }

  animateIn() {
    GSAP.fromTo(this.element, {
      autoAlpha: 0,
      y: '100%'
    }, {
      y: 0,
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