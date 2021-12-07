class Character {
  constructor(type, field, x, y) {
    // cells of this piece
    this.type = type;
    this.cells = characterTypes[type];
    this.size = this.cells.length; // assumed square matrix

    // drawing sizes
    this.cellSize = field.cellSize;
    this.offset = field.borderSize;

    // position
    this.x = x === undefined ? floor((field.cols - this.size) / 2) : x;
    this.y = y === undefined ? floor(field.rows - this.size - 4) : y;

    // score
    this.hs = 0;
    this.ss = 0;

    // sprite
    this.isRight = true;
    this.isAlive = true;
  }

  moveUp() {
    this.y--;
    this.isRight = !this.isRight;
    this.hs++;
    this.updateSprite();
  }
  moveDown() {
    this.y++;
    this.isRight = !this.isRight;
    this.hs--;
    this.updateSprite();
  }
  scroll() {
    this.y++;
  }
  moveLeft() {
    this.x--;
  }
  moveRight() {
    this.x++;
  }

  updateSprite() {
    if (this.hs > 0) {
      if (this.isRight) this.cells = characterTypes[this.type + "RR"];
      else this.cells = characterTypes[this.type + "LL"];
    }
    if (this.hs <= 0) this.cells = characterTypes[this.type];
  }

  updateAlive(field) {
    if (
      this.y > field.getRows() - 1 ||
      this.y < 0 ||
      this.x > field.getCols() - 1 ||
      this.x < -1
    )
      return this.isAlive = false;
    return this.isAlive = true;
  }

  teleport() {
    this.x = 4;
    console.log(this.y);
    this.y = (this.y - 3);
    console.log(this.y);
    this.cells = characterTypes[this.type + "R"];
  }

  show() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.cells[row][col]) {
          let x = this.x + col;
          let y = this.y + row;

          let cs = this.cellSize;
          let off = this.offset;

          if (spriteList.includes(this.cells[row][col])) {
            image(
              sprites[this.cells[row][col]],
              off + cs * x,
              off + cs * y,
              cs - 1,
              cs - 1
            );
          } else {
            fill(this.cells[row][col]);
            noStroke();
            rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
          }
        }
      }
    }
  }
}

let characterTypes = {
  D: [[__boy00__]],
  DR: [[__boy01__]],
  DL: [[__boy00__]],
  DRR: [[__boy10__]],
  DLL: [[__boy11__]],
};
