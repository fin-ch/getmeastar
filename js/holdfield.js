class Holdfield {
  constructor(w, h, type) {
    paused != paused;
    this.w = w;
    this.h = h;
    this.links = {};
    this.type = type;
  }

  createLink(title, posX, posY, w, h) {
    let link = [posX, posY, w, h, false];
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

  show(char) {
    background(80, 210);

    fill(240);
    textAlign(CENTER, CENTER);
    textSize(50);
    text(this.type, this.w / 2, this.h / 4);

    fill(230);
    textSize(30);
    text(char.hs + " m", this.w / 2, this.h / 4 + this.h / 12);
    text(
      char.ss + " stars",
      this.w / 2,
      this.h / 4 + this.h / 12 + this.h / 24
    );

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
      text(key, link[0], link[1]);
    });
  }
}
