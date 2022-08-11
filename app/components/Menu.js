import Component from "classes/Component";
import GSAP from "gsap";

export default class Menu extends Component {
  constructor() {
    super({
      element: ".menu",
      elements: {
        menu: document.querySelector(".menu"),
        hamburger: document.querySelector(".main__navigation__menu"),
        menuText: document.querySelector(".main__navigation__menu p"),
        links: document.querySelectorAll(".menu__item__text span"),
        menuItem: document.querySelectorAll(".menu__item")
      }
    });
    this.toggle = 0;
    this.createMenu();
  }

  animationIn() {
    GSAP.set(this.elements.menu, { x: "-101%"});
    GSAP.set(this.elements.links, { autoAlpha: 0, x: "-500"});
    GSAP.set(this.elements.menuItem, { autoAlpha: 0, x: "-500" })

    this.tl = GSAP.timeline();
    this.tl
      .to(this.elements.menu, { x: 0, duration: 0.6, ease:"power4.out"},0)
      .to(this.elements.links, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.2, ease:"power4.out" },0.2)
      .to(this.elements.menuItem, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.05, ease:"power4.out"}, 0.2)
  }

  animationOut() {
    GSAP.to(this.elements.menu, { 
      x: "101%", 
      duration: 0.5, 
      ease:"power4.easeInOut",
    });
  }

  createMenu() {
    this.elements.hamburger.addEventListener("click", () => {
      if (this.toggle === 0) {
        this.toggle++;
        this.elements.hamburger.classList.add("active");
        this.elements.menuText.classList.add("active")
        this.animationIn();
      } else {
        this.toggle--;
        this.elements.hamburger.classList.remove("active");
        this.animationOut();
      }
    });
  }
}