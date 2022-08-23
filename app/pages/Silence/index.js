import Page from "classes/Page"

export default class Silence extends Page {
  constructor() {
    super({
      id: 'silence',
      element: '.silence',
      elements: {
        wrapper: document.querySelector('.silence__wrapper'),
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu'),
      }
    })
  }
}