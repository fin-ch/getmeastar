class Objects {
  constructor(type, field) {
    // cells of this piece
    this.type = type;

    // drawing sizes
    this.cellSize = field.cellSize;
    this.offset = field.borderSize;

    // field size
    this.rows = field.rows;
    this.cols = field.cols;
  }

  scroll() {
    this.y++;
  }

  isBumppedChar(char) {
    for (let row = 0; row < char.size; row++) {
      for (let col = 0; col < char.size; col++) {
        for (let rrow = 0; rrow < this.size; rrow++) {
          for (let ccol = 0; ccol < this.size; ccol++) {
            let charRow, charCol, starRow, starCol;
            if (char.cells[row][col] != null) {
              charRow = char.y + row;
              charCol = char.x + col;
            }
            if (this.cells[rrow][ccol] != null) {
              starRow = this.y + rrow;
              starCol = this.x + ccol;
            }
            if (charRow == starRow && charCol == starCol) return true;
          }
        }
      }
    }
    return false;
  }

  isFirstLine() {
    for (let i = 0; i < this.size; i++) {
      if (this.y + i == 0) return true;
    }
    return false;
  }

  show() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.cells[row][col]) {
          let x = this.x + col;
          let y = this.y + row;

          let cs = this.cellSize;
          let off = this.offset;
          if (y >= 0) {
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
}

class Star extends Objects {
  constructor(type, field, x, y) {
    super(type, field);
    this.cells = objectTypes["Star"][type].map((v) => v.slice());
    this.score = objectScores["Star"][type];
    this.size = this.cells.length; // assumed square matrix

    // position
    this.x = x === undefined ? floor(random(field.cols - this.size)) : x;
    this.y = y || 1 - this.size;

    this.status = 0;
  }

  updateSprite() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (frameCount % 6 == 0 && this.cells[row][col] != __blank__) {
          this.status++;
          if (this.status > 7) this.status %= 8;
          if (this.type == "Y") this.cells[row][col] = sty0_list[this.status];
          if (this.type == "B") this.cells[row][col] = stb0_list[this.status];
          if (this.type == "P") this.cells[row][col] = stp0_list[this.status];
        }
      }
    }
  }
}

class Obstacle extends Objects {
  constructor(type, field, x, y) {
    super(type, field);
    this.cells = objectTypes["Obstacle"][type].map((v) => v.slice());
    this.score = objectScores["Obstacle"][type];
    this.size = this.cells.length; // assumed square matrix

    // position
    this.x = x === undefined ? floor(random(field.cols - this.size)) : x;
    this.y = y || 1 - this.size;

    // gravity
    this.dropInterval = random(600, 1200); // in ms
    this.dropBuffer = 0; // time since last dropv
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

  moveDown() {
    this.y++;
  }

  isBumppedLadder(field, ladder) {
    for (let row = 0; row < ladder.size; row++) {
      for (let col = 0; col < ladder.size; col++) {
        for (let rrow = 0; rrow < this.size; rrow++) {
          for (let ccol = 0; ccol < this.size; ccol++) {
            let ladRow, ladCol, obsRow, obsCol;
            if (ladder.cells[row][col] != null) {
              ladRow = ladder.y + row;
              ladCol = ladder.x + col;
            }
            if (this.cells[rrow][ccol] != null) {
              obsRow = this.y + rrow;
              obsCol = this.x + ccol;
            }
            if (
              ladRow >= field.spawns &&
              ladRow == obsRow &&
              ladCol == obsCol
            ) {
              sfxs["01_crash"].play();
              ladder.cells[row][col] = null;
            }
          }
        }
      }
    }
  }

  isBumppedField(field) {
    for (let rrow = 0; rrow < this.size; rrow++) {
      for (let ccol = 0; ccol < this.size; ccol++) {
        let obsRow, obsCol;
        if (this.cells[rrow][ccol] != null) {
          obsRow = this.y + rrow;
          obsCol = this.x + ccol;
        }
        if (obsRow < field.rows && field.grid[obsRow][obsCol] == __lad99__) {
          {
            sfxs["01_crash"].play();
            field.grid[obsRow][obsCol] = field.foreground[obsRow];
          }
        }
      }
    }
  }
}

class Background extends Objects {
  constructor(type, field, x, y) {
    super(type, field);
    console.log(objectTypes["Background"][type]);
    this.cells = objectTypes["Background"][type].map((v) => v.slice());
    //this.score = objectScores["Background"][type];
    this.size = this.cells.length; // assumed square matrix

    // position
    this.x = x === undefined ? floor(random(field.cols - this.size)) : x;
    this.y = y || 1 - this.size;

    this.status = 0;
    console.log("x", this.x);
    console.log("y", this.y);
    console.log("size", this.size);
    console.log("cells", this.cells);
  }

  updateSprite() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (frameCount % 4 == 0 && this.cells[row][col] != __blank__) {
          if (this.status > 10) this.cells[row][col] = __blank__;
          if (this.type == "TelA") {
            this.status++;
            this.cells[row][col] = tel0_list[this.status];
          }
          if (this.type == "TelB") {
            this.status++;
            this.cells[row][col] = tel2_list[this.status];
          }
        }
      }
    }
  }

  teleport(char) {
    if (this.type == "TelA" && this.status == 5) {
      char.teleport();
      nowScene.isTel = true;
    }
  }
}

let objectTypes = {
  Objects: {
    N: [[__blank__]],
  },
  Star: {
    N: [[__sta00__]],
    L: [
      [__sta00__, __sta00__],
      [__sta00__, __sta00__],
    ],
    Y: [[__sty00__]],
    B: [[__stb00__]],
    P: [[__stp00__]],
  },
  Obstacle: {
    N: [[__ast00__]],
  },
  Background: {
    G: [[__gir00__]],
    TelA: [[__tel00__]],
    TelB: [[__tel20__]],
    A: [[__ali00__]],
    S: [
      [
        __blank__,
        __blank__,
        __blank__,
        __blank__,
        __blank__,
        __blank__,
        __blank__,
      ],
      [
        __blank__,
        __sps01__,
        __sps02__,
        __sps03__,
        __sps04__,
        __sps05__,
        __blank__,
      ],
      [
        __sps07__,
        __sps08__,
        __sps09__,
        __sps10__,
        __sps11__,
        __sps12__,
        __sps13__,
      ],
      [
        __sps14__,
        __sps15__,
        __sps16__,
        __sps17__,
        __sps18__,
        __sps19__,
        __sps20__,
      ],
      [
        __sps21__,
        __sps22__,
        __sps23__,
        __sps24__,
        __sps25__,
        __sps26__,
        __sps27__,
      ],
      [
        __blank__,
        __sps29__,
        __sps30__,
        __sps31__,
        __sps32__,
        __sps33__,
        __blank__,
      ],
      [
        __blank__,
        __blank__,
        __blank__,
        __sps38__,
        __blank__,
        __blank__,
        __blank__,
      ],
      [
        __blank__,
        __blank__,
        __blank__,
        __sps45__,
        __blank__,
        __blank__,
        __blank__,
      ],
      [
        __blank__,
        __sps50__,
        __sps51__,
        __sps52__,
        __sps53__,
        __sps54__,
        __blank__,
      ],
    ],
  },
};

let objectScores = {
  Objects: {
    N: 0,
  },
  Star: {
    N: 2,
    L: 1,
    Y: 1,
    B: 5,
    P: 10,
  },
  Obstacle: {
    N: 0,
  },
};
