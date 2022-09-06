import each from "lodash/each";

export default class TextAnim {
  constructor(link) {
    
    this.menuItems = [...document.querySelectorAll(link)]
    this.createText();
  }

  createText() {
    each(this.menuItems, item => {

      let word = item.children[0].children[0].innerText.split("");
      item.children[0].innerHTML = "";
      each(word, (letter, idx) => {
        item.children[0].innerHTML += `<span style="--index: ${idx};">${letter}</span>`;
      });

      let cloneDiv = item.children[0].cloneNode(true);
      cloneDiv.style.position = "absolute";
      cloneDiv.style.left = "0";
      cloneDiv.style.top = "0";
      item.appendChild(cloneDiv);
    });
  }
}