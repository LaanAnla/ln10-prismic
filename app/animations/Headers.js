import Animation from "classes/Animation";
import GSAP from 'gsap'

export default class Heders extends Animation {
  constructor({element, elements}) {

    super({
      element,
      elements
    })
  }

  animateIn() {
    GSAP.fromTo(this.element, {
      autoAlpha: 0,
    }, {
      autoAlpha: 1,
      delay: 0.3,
      duration: 1.5
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