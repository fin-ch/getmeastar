class Scene {
  constructor(title, idx, txts) {
    this.img;
    this.check = false;
    this.isPopup = false;
    this.dialogue = [];
    this.popup = [];
    this.name = "";

    this.isTel = false;

    if(idx == 0) this.typingInterval = 2200; // in ms
    else this.typingInterval = 400; // in ms
    this.typingBuffer = 0; // time since last drop

    for (let txt of txts) {
      if (txt[0] == "#" && int(txt.split("#")[1]) == idx + 1)
        this.check = false;
      if (this.check == true && txt[0] == "$") this.name = txt;
      if (this.isPopup == true) this.popup.push(txt);
      if (this.check == true && txt == "$P") {
        this.check = false;
        this.isPopup = true;
      }
      if (this.check == true && txt[0] != "$") this.dialogue.push(txt);

      if (txt[0] == "#" && int(txt.split("#")[1]) == idx) this.check = true;
    }
  }

  update(time) {
    this.typingBuffer += time;
  }

  timeToType() {
    return this.typingBuffer > this.typingInterval;
  }

  resetBuffer() {
    this.typingBuffer = 0;
  }
}

class Scaling {
  constructor(sw, sh, ew, eh, ss, es) {
    this.totallength = 120;
    this.startzero = [sw, sh];
    this.endzero = [ew, eh];
    this.startscale = ss;
    this.endscale = es;
    this.startalpha = 0;
    this.endalpha = 255;

    this.nowframe = 0;
    this.nowzero = [sw, sh];
    this.nowscale = ss;
    this.nowalpha = this.startalpha;
  }

  update() {
    this.nowzero[0] =
      ((this.endzero[0] - this.startzero[0]) / this.totallength) *
        this.nowframe +
      this.startzero[0];
    this.nowzero[1] =
      ((this.endzero[1] - this.startzero[1]) / this.totallength) *
        this.nowframe +
      this.startzero[1];
    this.nowscale =
      ((this.endscale - this.startscale) / this.totallength) * this.nowframe +
      this.startscale;
    this.nowalpha =
      ((this.endalpha - this.startalpha) / this.totallength) * this.nowframe +
      this.startalpha;
  }

  gainFrame() {
    this.nowframe++;
  }

  loseFrame() {
    this.nowframe--;
  }

  show() {
    fill(0, this.nowalpha);
    rectMode(CORNER);
    rect(0, 0, width, (((width * 9) / 16) * this.nowframe) / this.totallength);
    rect(
      0,
      height - (((width * 9) / 16) * this.nowframe) / this.totallength,
      width,
      height
    );
  }
}
