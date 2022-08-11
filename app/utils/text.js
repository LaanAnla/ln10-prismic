import GSAP from "gsap";
import SplitText from "gsap/SplitText";

export default class TextIntro {
  constructor(text, contact, second) {
    
    // this.text = document.querySelectorAll(".contact__content__holder");
    // this.contact = document.querySelector(".contact__content__email");
    this.text = text;
    this.contact = contact;
    this.second = second;
    this.createTextContact();
  }

  createTextContact() {
  
    GSAP.registerPlugin(SplitText);

    var tl = GSAP.timeline(),
      mySplitText = new SplitText(this.text, { type: "words,chars" }),
      chars = mySplitText.chars; //an array of all the divs that wrap each character

    GSAP.set(this.text, { perspective: 400 });
    GSAP.set(this.contact, { perspective: 400 });

    tl.from(chars, {
      duration: 1.2,
      opacity: 0,
      scale: 0,
      y: 100,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
      ease: "back",
      stagger: 0.007
    });
    tl.from(this.contact, { 
      duration: 0.5,
      autoAlpha: 0,
      scale: 0,
      y: 80
    }, 0.3);

    tl.from(this.second, {
      duration: 0.3,
      autoAlpha: 0,
      scale: 0.8,
      stagger: 0.08,
      y: 100
    }, 0.3);
  }
}