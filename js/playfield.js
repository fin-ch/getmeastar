class Playfield {
  constructor(cols, rows, spawns, cellSize, borderSize, title) {
    // dimensions and grid
    this.cols = cols;
    this.rows = rows;
    this.spawns = spawns;
    this.grid = [];
    this.title = title;

    this.meter = this.rows - 5;

    // colors
    this.foreground = [];
    this.background = __gri00__;

    for (let row = 0; row < this.rows; row++) {
      this.foreground[row] = __sky00__;
    }

    this.resetGrid();

    // drawing sizes
    this.cellSize = cellSize;
    this.borderSize = borderSize;

    // whether or not gridlines are seen
    this.gridlines = true;
  }

  addToGrid(ladder) {
    for (let row = 0; row < ladder.size; row++) {
      for (let col = 0; col < ladder.size; col++) {
        if (ladder.cells[row][col] != null) {
          let gridRow = ladder.y + row;
          let gridCol = ladder.x + col;

          // this.grid[gridRow][gridCol] = ladder.cells[row][col];
          if (gridRow >= this.spawns) this.grid[gridRow][gridCol] = __lad99__;
        }
      }
    }
  }

  initGrid() {
    let row = this.rows - 1;
    for (let col = 0; col < this.cols; col++) {
      this.grid[row][col] = random(bas0_list);
    }
    row = this.rows - 2;
    for (let col = 0; col < this.cols; col++) {
      this.grid[row][col] = random(bas1_list);
    }
    row = this.rows - 3;
    for (let col = 0; col < this.cols; col++) {
      this.grid[row][col] = random(bas1_list);
    }
    row = this.rows - 4;
    for (let col = 0; col < this.cols; col++) {
      this.grid[row][col] = random(bas1_list);
    }
    row = this.rows - 5;
    for (let col = 0; col < this.cols; col++) {
      this.grid[row][col] = __bas20__;
    }
  }

  scrollGrid() {
    this.meter++;
    for (let row = this.rows - 2; row >= 0; row--) {
      this.foreground[row + 1] = this.foreground[row];
    }

    if (this.meter < levelBoundary[0]) {
      this.foreground[0] = __sky00__;
      if (!bgms["01_stage1"].isPlaying()) bgms["01_stage1"].play();
      nowStage = "stage1";
    } else if (
      this.meter >= levelBoundary[0] &&
      this.meter < levelBoundary[1]
    ) {
      this.foreground[0] = sky0_list[this.meter - levelBoundary[0]];
      if (bgms["01_stage1"].isPlaying()) bgms["01_stage1"].setVolume(0, 10.0);
    } else if (
      this.meter >= levelBoundary[1] &&
      this.meter < levelBoundary[2]
    ) {
      this.foreground[0] = __sky20__;
      if (!bgms["02_stage2"].isPlaying()) bgms["02_stage2"].play();
      nowStage = "stage2";
    } else if (
      this.meter >= levelBoundary[2] &&
      this.meter < levelBoundary[3]
    ) {
      this.foreground[0] = sky2_list[this.meter - levelBoundary[2]];
      if (bgms["02_stage2"].isPlaying()) bgms["02_stage2"].setVolume(0, 10.0);
    } else if (
      this.meter >= levelBoundary[3] &&
      this.meter < levelBoundary[4]
    ) {
      this.foreground[0] = __sky40__;
      if (!bgms["03_stage3"].isPlaying()) bgms["03_stage3"].play();
      nowStage = "stage3";
    } else if (
      this.meter >= levelBoundary[4] &&
      this.meter < levelBoundary[5]
    ) {
      this.foreground[0] = sky4_list[this.meter - levelBoundary[4]];
      if (bgms["03_stage3"].isPlaying()) bgms["03_stage3"].setVolume(0, 10.0);
    } else if (this.meter >= levelBoundary[5]) {
      this.foreground[0] = __sky60__;
      if (!bgms["04_stage4"].isPlaying()) bgms["04_stage4"].play();
      nowStage = "stage4";
    }

    for (let row = this.rows - 2; row >= 0; row--) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row + 1][col] = this.grid[row][col];
      }
    }
    for (let col = 0; col < this.cols; col++) {
      let row = 0;
      this.grid[row][col] = this.foreground[0];
    }
  }

  isValidSpace(obj) {
    let temp = true;
    for (let row = 0; row < obj.size; row++) {
      for (let col = 0; col < obj.size; col++) {
        if (obj.cells[row][col] != __blank__) {
          let gridRow = obj.y + row;
          let gridCol = obj.x + col;
          if (gridRow >= this.rows) obj.cells[row][col] = __blank__;
          temp = false;
        }
        if (obj.cells[row][col] != __blank__) {
          let gridRow = obj.y + row;
          let gridCol = obj.x + col;
          if (
            gridCol < 0 ||
            gridCol >= this.cols ||
            this.grid[gridRow][gridCol] != this.foreground[gridRow]
          )
            return false;
          temp = false;
        }
      }
    }
    if (temp == true) return false;
    return true;
  }

  isValidField(obj) {
    let temp = true;
    for (let row = 0; row < obj.size; row++) {
      for (let col = 0; col < obj.size; col++) {
        if (obj.cells[row][col] != __blank__) {
          let gridRow = obj.y + row;
          let gridCol = obj.x + col;
          if (gridRow >= this.rows) {
            obj.cells[row][col] = __blank__;
            console.log("CHECK");
          }
          temp = false;
        }
        if (obj.cells[row][col] != __blank__) {
          let gridRow = obj.y + row;
          let gridCol = obj.x + col;
          if (gridCol < 0 || gridCol >= this.cols) return false;
          temp = false;
        }
      }
    }
    if (temp == true) return false;
    return true;
  }

  isValidLadder(char) {
    for (let row = 0; row < char.size; row++) {
      for (let col = 0; col < char.size; col++) {
        if (char.cells[row][col] != null) {
          let gridRow = char.y + row;
          let gridCol = char.x + col;

          if (
            gridRow < 0 ||
            gridRow >= this.rows ||
            gridCol < 0 ||
            gridCol >= this.cols
          )
            return false;
          else if (this.grid[gridRow][gridCol] != this.foreground[gridRow])
            return true;
        }
      }
    }

    return false;
  }

  resetGrid() {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = new Array(this.cols).fill(this.foreground[i]);
    }
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }

  displayScore(char) {
    fill(20);
    textAlign(RIGHT, TOP);
    textSize(20);
    if (char.hs < 0) text("0 m", 50, -30);
    else text(char.hs + " m", 50, -30);
    text(char.ss + " stars", 150, -30);
  }

  show() {
    //===========================
    // Draw the rectangle behind all the cells
    // for the border and gridlines
    //===========================

    let bs = this.borderSize;
    let cs = this.cellSize;

    if (this.gridlines) fill(this.background);
    else fill(__gir00__);

    stroke(this.background);
    strokeWeight(bs);

    // offset the rectangle so that
    // top and right borders stay in canvas
    let offset = floor(bs / 2);
    rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1);

    //===========================
    // End of big rectangle
    //===========================

    //===========================
    // Draw cells over the big rectangle
    //===========================

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        // offset the cells by the size of the border
        let offset = this.borderSize;

        let cs = this.cellSize;

        // this.grid contains the colors of each cell
        if (spriteList.includes(this.grid[row][col])) {
          image(
            sprites[this.grid[row][col]],
            cs * col + offset,
            cs * row + offset,
            cs - 1,
            cs - 1
          );
        } else {
          fill(this.grid[row][col]);
          noStroke();
          rect(cs * col + offset, cs * row + offset, cs - 1, cs - 1);
        }
      }
    }

    //===========================
    // End of cells loop
    //===========================
  } // end of show()
}
