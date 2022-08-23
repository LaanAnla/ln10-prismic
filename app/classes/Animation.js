import Component from "classes/Component"

export default class Animation extends Component {
  constructor({ element, elements}) {
    super({ 
      element,
      elements
    })

    this.createObserver()

    this.animateOut()
  }

  createObserver() {

    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)
  }

  animateIn() {

  }

  animateOut() {

  }
}