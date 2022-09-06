import Page from "classes/Page";
import TextAnim from "utils/textAnim"

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }

  create() {
    super.create()
    this.animation = new TextAnim(".home__links__link");
  }
}