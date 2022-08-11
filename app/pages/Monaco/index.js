import Page from "classes/Page";

export default class Monaco extends Page {
  constructor() {
    super({
      id: 'monaco',
      element: '.monaco',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }
}