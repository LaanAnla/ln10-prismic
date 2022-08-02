import Page from "classes/Page";

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
}