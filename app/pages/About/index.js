import Page from "classes/Page";
import TextIntro from "utils/text"

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }

  create() {
    super.create()
    this.animation = new TextIntro(
      this.text = document.querySelector('.about__introduction'),
      this.contact =  document.querySelector('.about__description'),
      this.second = null
    )      
  }
}