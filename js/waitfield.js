class Waitfield {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.links = {};
  }

  createLink(title, posX, posY, w, h, txt) {
    let link = [posX, posY, w, h, false, txt];
    // properties;  0:posX, 1:posY, 2:width, 3:height 4:isPressed
    this.links[title] = link;
  }

  activeLink(title) {
    if (title in this.links) {
      let link = this.links[title];
      if (
        mouseX > link[0] - link[2] / 2 &&
        mouseX < link[0] + link[2] / 2 &&
        mouseY > link[1] - link[3] / 2 &&
        mouseY < link[1] + link[3] / 2
      ) {
        if (mouseIsPressed) {
          link[4] = true;
          // pressed action
        }
        if (!mouseIsPressed && link[4]) {
          link[4] = false;
          return true;
        }
      }
    }
    return false;
  }

  show() {
    background(240);
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("별을 따다 줘", width / 2, height / 3);

    fill(20);
    textAlign(CENTER, CENTER);
    textSize(15);
    for (let i = 0; i < texts["intro"].length; i++) {
      text(texts["intro"][i], width / 2, height / 3 + 80 + i * 20);
    }

    let links = this.links;
    Object.keys(links).forEach(function (key) {
      let link = links[key];
      noStroke();
      fill(50);
      rectMode(CENTER);
      rect(link[0], link[1], link[2], link[3]);
      fill(250);
      textAlign(CENTER, CENTER);
      textSize(20);
      text(link[5], link[0], link[1]);
    });
  }
}
