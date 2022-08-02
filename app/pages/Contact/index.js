import Page from "classes/Page";

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
}