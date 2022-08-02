import Page from "classes/Page";

export default class Projets extends Page {
  constructor() {
    super({
      id: 'projets',
      element: '.projets',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }

  create() {
    super.create()

    this.elements.navigation.addEventListener('click', _ => {
      console.log("oh, you click me right now")
    })
  }
}