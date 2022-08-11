import Page from "classes/Page";

export default class Antonin extends Page {
  constructor() {
    super({
      id: 'antonin',
      element: '.team__members',
      elements: {
        navigation: document.querySelector('.main__navigation__menu div'),
        menu: document.querySelector('.menu')
      }
    })
  }

  // create() {
  //   super.create()

  //   this.elements.navigation.addEventListener('click', _ => {
  //     console.log("oh, you click me right now")
  //   })
  // }
}