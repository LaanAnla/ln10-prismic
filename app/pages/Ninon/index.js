import Page from "classes/Page";

export default class Ninon extends Page {
  constructor() {
    super({
      id: 'ninon',
      element: '.team__members',
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