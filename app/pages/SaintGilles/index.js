import Page from "classes/Page";

export default class SaintGilles extends Page {
  constructor() {
    super({
      id: 'saintGilles',
      element: '.saint-gilles',
      elements: {
        wrapper: document.querySelector('.saint-gilles__wrapper'),
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }
}