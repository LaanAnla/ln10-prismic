import Page from "classes/Page";

export default class SaintGilles extends Page {
  constructor() {
    super({
      id: 'saint-gilles',
      element: '.saint-gilles',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }
}