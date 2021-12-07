class Ladder {
  constructor(type, field, x, y) {
    // cells of this piece
    this.type = type;
    this.cells = ladderTypes[type].map((v) => v.slice());
    this.size = this.cells.length; // assumed square matrix

    // drawing sizes
    this.cellSize = field.cellSize;
    this.offset = field.borderSize;

    // position of top-left piece relative to playfield
    this.x = x === undefined ? floor(random(field.cols - this.size)) : x;
    this.y = y || 0;

    // gravity
    this.dropInterval = 2000; // in ms
    this.dropBuffer = 0; // time since last drop
  }

  update(time) {
    this.dropBuffer += time;
  }

  timeToFall() {
    return this.dropBuffer > this.dropInterval;
  }

  resetBuffer() {
    this.dropBuffer = 0;
  }

  copy(ladder) {
    this.x = ladder.x;
    this.y = ladder.y;
    this.cells = ladder.cells;
  }

  show() {
    // for each non-null cell in this piece, fill in
    // the specified color and draw the rectangle
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
              off + cs * x, off + cs * y, cs - 1, cs - 1
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

  moveDown() {
    this.y++;
  }
  moveRight() {
    this.x++;
  }
  moveLeft() {
    this.x--;
  }
  moveUp() {
    this.y--;
  }

  changeCell(r, c, input) {
    this.cells[r][c] = input;
  }

  //================================
  // Rotate functions
  //================================

  // rotate clockwise
  rotateCW() {
    let newCells = [];

    for (let col = 0; col < this.size; col++) {
      let newRow = [];
      for (let row = this.size - 1; row >= 0; row--) {
        newRow.push(this.cells[row][col]);
      }
      newCells.push(newRow);
    }
    this.cells = newCells;
  }

  // rotate counter-clockwise
  rotateCCW() {
    let newCells = [];
    for (let col = this.size - 1; col >= 0; col--) {
      let newRow = [];
      for (let row = 0; row < this.size; row++) {
        newRow.push(this.cells[row][col]);
      }
      newCells.push(newRow);
    }
    this.cells = newCells;
  }

  //================================
  // End of rotate functions
  //================================
}

let ladderTypes = {
  A: [[__lad00__]],
  B: [
    [__lad00__, __blank__],
    [__lad00__, __blank__],
  ],
  C: [
    [__blank__, __blank__],
    [__lad00__, __lad00__],
  ],
  D: [
    [__lad00__, __blank__],
    [__lad00__, __lad00__],
  ],
  E: [
    [__lad00__, __lad00__],
    [__blank__, __lad00__],
  ],
  F: [
    [__blank__, __lad00__],
    [__lad00__, __lad00__],
  ],
  G: [
    [__lad00__, __lad00__],
    [__lad00__, __blank__],
  ],
  H: [
    [__blank__, __blank__, __blank__],
    [__blank__, __blank__, __blank__],
    [__lad00__, __lad00__, __lad00__],
  ],
  I: [
    [__lad00__, __blank__, __blank__],
    [__lad00__, __blank__, __blank__],
    [__lad00__, __blank__, __blank__],
  ],
};

/*
let ladderTypes = {
  O: [
    ["#f43", "#f43"],
    ["#f43", "#f43"],
  ],

  J: [
    ["#f43", null, null],
    ["#f43", "#f43", "#f43"],
    [null, null, null],
  ],

  L: [
    [null, null, "#f43"],
    ["#f43", "#f43", "#f43"],
    [null, null, null],
  ],

  S: [
    [null, "#f43", "#f43"],
    ["#f43", "#f43", null],
    [null, null, null],
  ],

  Z: [
    ["#f43", "#f43", null],
    [null, "#f43", "#f43"],
    [null, null, null],
  ],

  T: [
    [null, "#f43", null],
    ["#f43", "#f43", "#f43"],
    [null, null, null],
  ],

  I: [
    [null, null, null, null],
    ["#f43", "#f43", "#f43", "#f43"],
    [null, null, null, null],
    [null, null, null, null],
  ],
};
*/
