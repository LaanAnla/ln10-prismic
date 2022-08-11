import Page from "classes/Page"
import TextIntro from "utils/text"

export default class Contact extends Page {
  constructor() {
    super({
      id: 'contact',
      element: '.contact',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })

    
  }

  create() {
    super.create()
    
      this.animation = new TextIntro(
        this.text = document.querySelectorAll(".contact__content__holder"),
        this.contact = document.querySelector(".contact__content__email"),
        this.second = null
      )
  }
}