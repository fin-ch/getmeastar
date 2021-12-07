//=================================
// *                             *
// *  GET ME A STAR              *
// *                             *
// *  IICT 2021-2 final project  *
// *                             *
//=================================

// Field related variable
// let fields = ["wait", "limited", "unlimited"];
let fieldSelector;
let wait, limited, unlimited, result, hold;

// Ladder related variable
let fallingLadder, paused;

// Character related variable
let playChar;
let starScore = 0;

// Object related variable
let fallingStars = [];
let fallingObstacles = [];
let backgrounds = [];
let tels = [];
let isAlien = false;

// Size related variable
let totalWidth, totalHeight;
let topMargin, bottomMargin, leftMargin;
let cellSize, borderSize;
let playableWidth, playableHeight;
const spawns = 3;
const cols = 11;
const rows = 22;
let textMargin;

// Scenary related variable
let sceneSelector;
const sceneIdx = ["prologue", "epilogueA"];
let scenes = {
  prologue: [],
  epilogueA: [],
};
const pages = {
  prologue: 9,
  epilogueA: 5,
};
const textIdx = ["prologue", "epilogueA", "help", "credit", "intro"];
let texts = {
  prologue: [],
  epilogueA: [],
  help: [],
  credit: [],
  intro: [],
};
let currPage = 0;
let skipAble = false;
let nowScene;

let isScene = true;
let nowScale = 1.0;
let nowZero = [];
let sampleScale = {};
let endScene = false;

// level related variable
let nowStage = "stage1"
let epigoal = 0;

// Text related variable
const textInterval = 100;
let textBuffer = 0;
let textCursor = [0, 0];
let nowtext = [];
let typingStyle;

// Sound related variable
let sfxs = {};
let bgms = {};

// Scroll related variable
// const scrollInterval = 2500; // in ms
let scrollBuffer;

// Visualize related variable
let nemojinFont;
let sprites = {};
let ballons = {};

// Extra variable
let prev = 0;
let init, initWait, initHold, initScene;
let control;
let prevfield;
let isTutorial = false;
let savedy;

function preload() {
  nemojinFont = loadFont("assets/fonts/210 Nemojin 030.ttf");
  for (let idx of textIdx) texts[idx] = loadStrings("txt/" + idx + ".txt");
  for (let img of spriteList) {    
    sprites[img] = loadImage("assets/images/sprites/" + img + ".png");
  }
  for (let img of ballonList) {
    ballons[img] = loadImage("assets/images/ballons/" + img + ".png");
  }
  for (let sound of sfxList)
    sfxs[sound] = loadSound("assets/sounds/sfxs/" + sound + ".mp3");
  for (let sound of bgmList)
    bgms[sound] = loadSound("assets/sounds/bgms/" + sound + ".mp3");
}

function setup() {
  // Text
  textFont(nemojinFont);

  // Define size
  totalHeight = windowHeight;
  totalWidth = (totalHeight * 9) / 16;
  topMargin = totalHeight / 10;
  bottomMargin = totalHeight / 20;
  cellSize = (totalHeight - topMargin - bottomMargin) / rows;
  borderSize = cellSize / 20;
  playableWidth = cellSize * cols + borderSize * 2;
  playableHeight = cellSize * rows + borderSize * 2;
  textMargin = totalHeight / 36;
  leftMargin = (totalWidth - playableWidth) / 2;

  // Generate waitfield
  wait = new Waitfield(totalWidth, totalHeight);
  wait.createLink(
    "limited",
    totalWidth / 4 + totalWidth / 48,
    totalHeight / 2 + totalHeight / 4,
    totalWidth / 3,
    totalHeight / 12,
    "스토리 모드"
  );
  wait.createLink(
    "unlimited",
    totalWidth / 2 + totalWidth / 4 - totalWidth / 48,
    totalHeight / 2 + totalHeight / 4,
    totalWidth / 3,
    totalHeight / 12,
    "인피니티 모드"
  );
  wait.createLink(
    "help",
    totalWidth / 4 + totalWidth / 48,
    totalHeight / 2 + totalHeight / 4 + totalHeight / 8,
    totalWidth / 3,
    totalHeight / 12,
    "도움말"
  );
  wait.createLink(
    "credit",
    totalWidth / 2 + totalWidth / 4 - totalWidth / 48,
    totalHeight / 2 + totalHeight / 4 + totalHeight / 8,
    totalWidth / 3,
    totalHeight / 12,
    "만든 사람들"
  );
  initWait = false;

  result = new Holdfield(totalWidth, totalHeight, "result");
  result.createLink(
    "start menu",
    totalWidth / 2,
    totalHeight / 2 + totalHeight / 4,
    totalWidth / 2,
    totalHeight / 12
  );
  pause = new Holdfield(totalWidth, totalHeight, "hold");
  pause.createLink(
    "start menu",
    totalWidth / 2,
    totalHeight / 2 + totalHeight / 4,
    totalWidth / 2,
    totalHeight / 12
  );
  pause.createLink(
    "go back to game",
    totalWidth / 2,
    totalHeight / 2 + totalHeight / 4 + totalHeight / 8,
    totalWidth / 2,
    totalHeight / 12
  );

  // Select first field
  fieldSelector = "wait";

  // Load scene
  for (let idx of sceneIdx) {
    for (let i = 0; i < pages[idx]; i++) {
      let sc = new Scene(idx, i, texts[idx]);
      scenes[idx].push(sc);
    }
  }
  for (let i = 1; i < levelMeter.length; i++) {
    levelBoundary[i] = levelBoundary[i - 1] + levelMeter[i];
  }

  epigoal = levelBoundary[5]+90;

  createCanvas(totalWidth, totalHeight);
}

let delta;
function draw() {
  // Get time passed since last frame
  //============================
  let curr = millis();
  delta = curr - prev;
  prev = curr;
  //============================

  // Select the field
  //============================
  switch (fieldSelector) {
    case "wait":
      if (!bgms["00_intro"].isPlaying()) bgms["00_intro"].play();
      waitfield();
      break;
    case "limited":
      initWait = false;
      isTutorial = false;
      limitedfield();
      break;
    case "unlimited":
      initWait = false;
      unlimitedfield();
      break;
    case "pause":
      console.log("paused");
      pausefield();
      break;
    case "result":
      resultfield();
      break;
    case "help":
      initWait = false;
      helpfield();
      break;
    case "credit":
      initWait = false;
      creditfield();
  }
  //============================
}

function waitfield() {
  // Initializing
  //============================
  if (!initWait) {
    init = false;
    initHold = false;
    initScene = false;
    endScene = false;
    scrollBuffer = 0;
    fallingLadder = null;
    playChar = null;
    fallingStars = [];
    fallingObstacles = [];
    backgrounds = [];
    savedy = 0;
    isAlien = false;
    limited = new Playfield(
      cols,
      rows,
      spawns,
      cellSize,
      borderSize,
      "limited"
    );
    unlimited = new Playfield(
      cols,
      rows,
      spawns,
      cellSize,
      borderSize,
      "unlimited"
    );
    sampleScale["prologue"] = new Scaling(
      leftMargin,
      topMargin,
      (leftMargin / 4 - (playableWidth * 1.35) / cols) * 2,
      (topMargin / 4 - (playableHeight * 11) / rows) * 2,
      1.0,
      2.0
    );
    typingStyle = {
      $B1: [
        "LEFT",
        totalWidth / 2 + totalWidth / 24,
        totalHeight / 2,
        true,
        color(0),
      ],
      $G1: [
        "RIGHT",
        totalWidth / 2 - totalWidth / 24,
        totalHeight / 2,
        true,
        color(0),
      ],
      $TBU: [
        "LEFT",
        textMargin,
        (totalWidth * 9) / 16 - textMargin,
        false,
        color(250),
      ],
      $A1: [
        "LEFT",
        totalWidth / 2 + totalWidth / 24,
        totalHeight / 2 + totalHeight /24,
        true,
        color(0),
      ],
      $B2: [
        "RIGHT",
        totalWidth / 2 - totalWidth / 24,
        totalHeight / 2  + totalHeight /24,
        true,
        color(0),
      ],
      $TBD: [
        "LEFT",
        textMargin,
        (totalWidth * 9) / 16 - textMargin,
        false,
        color(250),
      ],
    };
    sceneSelector = "prologue";
    currPage = 0;
    initWait = true;
  }
  //============================

  for (var key in bgms) {
    if (key != "00_intro") {
      bgms[key].stop();
      bgms[key].setVolume(1);
    }
  }

  if (!bgms["00_intro"].isPlaying()) bgms["00_intro"].play();

  if (wait.activeLink("limited")) {
    isScene = true;
    fieldSelector = "limited";
  }
  if (wait.activeLink("unlimited")) fieldSelector = "unlimited";
  if (wait.activeLink("help")) fieldSelector = "help";
  if (wait.activeLink("credit")) fieldSelector = "credit";

  // Draw
  //============================
  background(200);
  wait.show();
  //============================
}

function limitedfield() {
  baseline(limited);

  if (isScene == true) {
    scenefield(limited);
    if (sceneSelector == "prologue") {
      if (!bgms["01_stage1"].isPlaying()) bgms["01_stage1"].play();
    }
  }

  /*
  if (limited.meter == 20 + 3 && isAlien == false) {
    let alien = new Background("A", limited, 6);
    backgrounds.push(alien);
    isAlien = true;
  }
  */

  if (isScene == false && playChar.hs >= epigoal) {
    sceneSelector = "epilogueA";
    currPage = 0;
    savedy = playChar.y;
    if (savedy >= 8) {
      sampleScale["epilogueA"] = new Scaling(
        leftMargin,
        topMargin,
        (leftMargin / 4 - (playableWidth * 2.35) / cols) * 2,
        (topMargin / 4 - (playableHeight * (playChar.y - 10)) / rows) * 2,
        1.0,
        2.0
      );
    } else {
      sampleScale["epilogueA"] = new Scaling(
        leftMargin,
        topMargin,
        (leftMargin / 4 - (playableWidth * 2.35) / cols) * 2,
        (topMargin / 4 - (playableHeight * -3) / rows) * 2,
        1.0,
        2.0
      );
    }
    savedy = playChar.y;
    isScene = true;
    endScene = false;
  }
}

function scenefield(field) {
  // Init
  //============================
  if (!initScene) {
    paused = true;
    nowScene = scenes[sceneSelector][currPage];
    nowtext = [];
    textCursor = [0, 0];
    skipAble = false;
    initScene = true;

    if (sceneSelector == "epilogueA" && currPage == 0) {
      let telA = new Background("TelA", field, 4, playChar.y - 3);
      let telB = new Background("TelB", field, playChar.x, playChar.y);
      tels.push(telA);
      tels.push(telB);
    }
  }
  //============================
  // Show scene
  //============================

  if (sceneSelector == "epilogueA") {
    if (savedy < 8) {
      // scroll
      for (let i = 0; i < 9 - playChar.y; i++) {
        typingStyle[nowScene.name][0];
        field.scrollGrid();
        playChar.scroll();
        for (let i = fallingStars.length - 1; i >= 0; i--) {
          let fallingStar = fallingStars[i];
          fallingStar.scroll();
          if (!field.isValidField(fallingStar)) fallingStars.splice(i, 1);
        }
        for (let i = fallingObstacles.length - 1; i >= 0; i--) {
          let fallingObstacle = fallingObstacles[i];
          fallingObstacle.scroll();
          if (!field.isValidField(fallingObstacle))
            fallingObstacles.splice(i, 1);
        }
        for (let i = backgrounds.length - 1; i >= 0; i--) {
          let background = backgrounds[i];
          background.scroll();
          if (!field.isValidField(background)) backgrounds.splice(i, 1);
        }
        for (let i = tels.length - 1; i >= 0; i--) {
          let tel = tels[i];
          tel.scroll();
          if (!field.isValidField(tel)) tels.splice(i, 1);
        }
      }
    }
  }
  savedy = 999;

  for (let tel of tels) {
    if (!nowScene.isTel && currPage == 0) {
      tel.teleport(playChar);
    }
  }
  //============================
  if (
    endScene == false &&
    sampleScale[sceneSelector].nowframe < sampleScale[sceneSelector].totallength
  ) {
    sampleScale[sceneSelector].gainFrame();
    sampleScale[sceneSelector].update();
  }

  sampleScale[sceneSelector].show();
  nowScene.update(delta);

  if (nowScene.timeToType() && endScene == false) typing();
  if (endScene == true) {
    if (sampleScale[sceneSelector].nowframe > 0) {
      sampleScale[sceneSelector].loseFrame();
      sampleScale[sceneSelector].update();
    }
    if (sampleScale[sceneSelector].nowframe == 0) {
      isScene = false;
      initScene = false;
      paused = false;
    }
  }
}

function unlimitedfield() {
  baseline(unlimited);
}

function pausefield() {
  if (!initHold) {
    pause.show(playChar);
    initHold = true;
  }
  if (pause.activeLink("start menu")) fieldSelector = "wait";
  if (pause.activeLink("go back to game")) {
    fieldSelector = prevfield;
  }
}

function resultfield() {
  if (!initHold) {
    sfxs["00_gameover"].play();
    result.show(playChar);
    initHold = true;
  }
  if (result.activeLink("start menu")) fieldSelector = "wait";
}

function helpfield() {
  fill(160);
  rectMode(CORNER);
  rect(height / 24, height / 24, width - (height * 2) / 24, (height * 22) / 24);
  fill(250);
  textAlign(CENTER, CENTER);
  textSize(20);
  for (let i = 0; i < texts["help"].length; i++) {
    let txt = texts["help"][i];
    text(txt, width / 2, height / 12 + i * 2 * 20);
  }
}

function creditfield() {
  fill(160);
  rectMode(CORNER);
  rect(height / 24, height / 24, width - (height * 2) / 24, (height * 22) / 24);
  fill(250);
  textAlign(CENTER, CENTER);
  textSize(20);
  for (let i = 0; i < texts["credit"].length; i++) {
    let txt = texts["credit"][i];
    text(txt, width / 2, height / 12 + i * 2 * 20);
  }
}

function baseline(field) {
  // Initializing
  //============================
  if (!init) {
    spawnNewLadder(field);
    playChar = new Character("D", field);
    field.initGrid();
    for (let row = 0; row < 3; row++) {
      fallingStar = new Star("Y", field, int(random(field.cols - 1)), row);
      fallingStars.push(fallingStar);
    }
    for (let row = 0; row < 1; row++) {
      fallingObstacle = new Obstacle(
        "N",
        field,
        int(random(field.cols - 1)),
        row
      );
      fallingObstacles.push(fallingObstacle);
    }
    let background = new Background("G", field, 3, field.rows - 5);
    backgrounds.push(background);
    init = true;
  }
  //============================

  if (bgms["00_intro"].isPlaying()) bgms["00_intro"].stop();

  // Update
  //============================
  initHold = false;
  if (!paused) {
    fallingLadder.update(delta);
    for (let fallingObstacle of fallingObstacles) fallingObstacle.update(delta);
    scrollBuffer += delta;
  }
  for (let fallingStar of fallingStars) fallingStar.updateSprite();
  for (let background of backgrounds) background.updateSprite();
  for (let tel of tels) tel.updateSprite();
  //============================

  // Move down ladder and spawn a new one if necessary
  //============================
  if (fallingLadder.timeToFall()) {
    fallingLadder.resetBuffer();
    fallingLadder.moveDown();

    if (!field.isValidSpace(fallingLadder)) {
      fallingLadder.moveUp();
      spawnNewLadder(field);
    }
  }
  for (let i = fallingObstacles.length - 1; i >= 0; i--) {
    let fallingObstacle = fallingObstacles[i];
    if (fallingObstacle.timeToFall()) {
      fallingObstacle.resetBuffer();
      fallingObstacle.moveDown();
      if (!field.isValidField(fallingObstacle)) fallingObstacles.splice(i, 1);
    }
  }
  //============================

  // Scroll up the view
  //============================
  if (scrollBuffer > levelDesign[nowStage]["scrollInterval"]) {
    // scroll each one
    field.scrollGrid();
    playChar.scroll();
    for (let i = fallingStars.length - 1; i >= 0; i--) {
      let fallingStar = fallingStars[i];
      fallingStar.scroll();
      if (!field.isValidField(fallingStar)) fallingStars.splice(i, 1);
    }
    for (let i = fallingObstacles.length - 1; i >= 0; i--) {
      let fallingObstacle = fallingObstacles[i];
      fallingObstacle.scroll();
      if (!field.isValidField(fallingObstacle)) fallingObstacles.splice(i, 1);
    }
    for (let i = backgrounds.length - 1; i >= 0; i--) {
      let background = backgrounds[i];
      background.scroll();
      if (!field.isValidField(background)) backgrounds.splice(i, 1);
    }

    // check character is alive
    playChar.updateAlive(field);
    if (!playChar.isAlive) fieldSelector = "result";

    // spawn objects randomly
    spawnNewStar(field);
    spawnNewObstacle(field);

    // 
    console.log(field.meter);
    if (field.meter == (epigoal + 2) && field.title == "limited") {
      let spaceship = new Background("S", field, 2);
      backgrounds.push(spaceship);
    }

    if (field.meter == (epigoal + 3) && field.title == "limited") {
      console.log("hello");
      let alien = new Background("A", field, 6);
      backgrounds.push(alien);
    }

    // reset Buffer
    scrollBuffer = 0;
  }
  //============================

  // Check character is bumpped
  //============================
  for (let i = 0; i < fallingStars.length; i++) {
    let fallingStar = fallingStars[i];
    if (fallingStar.isBumppedChar(playChar)) {
      sfxs["05_getstar"].play();
      playChar.ss += fallingStar.score;
      fallingStars.splice(i, 1);
    }
  }
  //============================

  // Check obstacle is bumpped
  //============================
  for (let fallingObstacle of fallingObstacles) {
    fallingObstacle.isBumppedLadder(field, fallingLadder);
    fallingObstacle.isBumppedField(field);
    if (fallingObstacle.isBumppedChar(playChar)) playChar.isAlive = false;
    if (!playChar.isAlive) fieldSelector = "result";
  }
  //============================

  // Draw
  //============================
  background(251);

  rectMode(CORNER);
  push();
  translate(
    sampleScale[sceneSelector].nowzero[0],
    sampleScale[sceneSelector].nowzero[1]
  );
  scale(sampleScale[sceneSelector].nowscale);
  field.show();
  if (isScene == false) fallingLadder.show();
  for (let fallingObstacle of fallingObstacles) fallingObstacle.show();
  for (let fallingStar of fallingStars) fallingStar.show();
  for (let background of backgrounds) background.show();
  if (playChar.isAlive) playChar.show();
  for (let tel of tels) tel.show();
  field.displayScore(playChar);
  scale(1 / sampleScale[sceneSelector].nowscale);
  translate(0, 0);
  pop();
  //============================
}

function hardDrop(ladder, field) {
  // move down as long as current position is valid
  while (field.isValidSpace(ladder)) {
    ladder.moveDown();
    for (let fallingObstacle of fallingObstacles)
      fallingObstacle.isBumppedLadder(field, ladder);
  }

  // in the last iteration the position isn't valid,
  // so move up
  ladder.moveUp();
}

function spawnNewLadder(field) {
  if (fallingLadder) {
    sfxs["04_addgrid"].play();
    field.addToGrid(fallingLadder);
  }

  //const ladders = ["O", "J", "L", "S", "Z", "T", "I"];
  const ladders = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const choice = random(ladders);
  fallingLadder = new Ladder(choice, field);

  redraw();
}

function spawnNewStar(field) {
  const stars = ["Y", "B", "P"];
  const prob = levelDesign[nowStage]["star"];
  let choice = random(1);
  let pp = 0;
  let fallingStar;
  for (let i = 0; i < prob.length; i++) {
    pp += prob[i];
    if (choice < pp) {
      choice = stars[i];
      fallingStar = new Star(choice, field);
      if (fallingStars.length == 0) {
        fallingStars.push(fallingStar);
        return;
      } else if (!fallingStars[fallingStars.length - 1].isFirstLine())
        fallingStars.push(fallingStar);
    }
  }
}

function spawnNewObstacle(field) {
  const obstacles = ["N"];
  const prob = levelDesign[nowStage]["obstacle"];
  let choice = random(1);
  let pp = 0;
  let fallingObstacle;
  for (let i = 0; i < prob.length; i++) {
    if (choice < prob[i]) {
      choice = obstacles[i];
      fallingObstacle = new Obstacle(choice, field);
      if (fallingObstacles.length == 0) {
        fallingObstacles.push(fallingObstacle);
        return;
      } else if (!fallingObstacles[fallingObstacles.length - 1].isFirstLine())
        fallingObstacles.push(fallingObstacle);
    }
    pp += prob[i];
  }
}

function typing() {
  let di = nowScene.dialogue[textCursor[0]];
  di = di.split("");
  nowtext[textCursor[0]] = "";
  for (let i = 0; i < textCursor[1]; i++) {
    nowtext[textCursor[0]] = nowtext[textCursor[0]].concat(di[i]);
  }

  fill(typingStyle[nowScene.name][4]);
  if (typingStyle[nowScene.name][0] == "LEFT") textAlign(LEFT, BOTTOM);
  else if (typingStyle[nowScene.name][0] == "RIGHT") textAlign(RIGHT, BOTTOM);
  else textAlign(CENTER, BOTTOM);
  textSize(20);

  let maxlen = 0;

  for (let i = 0; i < nowtext.length; i++) {
    if (maxlen < nemojinFont.textBounds(nowtext[i], 0, 0, 20).w)
      maxlen = nemojinFont.textBounds(nowtext[i], 0, 0, 20).w;
  }

  ballon(20, maxlen, nowtext.length);

  for (let i = 0; i < nowtext.length; i++) {
    text(
      nowtext[i],
      typingStyle[nowScene.name][1],
      typingStyle[nowScene.name][2] - (nowtext.length - 1 - i) * 20
    );
  }
  if (textBuffer > textInterval) {
    if (textCursor[1] > di.length - 1) {
      if (textCursor[0] < nowScene.dialogue.length - 1) {
        textCursor[0]++;
        textCursor[1] = 0;
      } else {
        skipAble = true;
      }
      textBuffer = 0;
    } else {
      textCursor[1]++;
      textBuffer = 0;
    }
  }
  textBuffer += delta;
}

function ballon(size, length, line) {
  let count;
  let add = 0;
  if (length > size) {
    add = length - size;
    count = parseInt(length / size) + 1;
  }
  if (typingStyle[nowScene.name][3] == true) {
    if (typingStyle[nowScene.name][0] == "LEFT") {
      image(
        ballons["bal01"],
        typingStyle[nowScene.name][1] + (size / 2 + add),
        typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal02"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal03"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (-1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal04"],
        typingStyle[nowScene.name][1] + (size / 2 + add),
        typingStyle[nowScene.name][2] + size * (-1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal10"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (1 / 4),
        size,
        size
      );

      if (add > 0) {
        image(
          ballons["bal00"],
          typingStyle[nowScene.name][1] + size / 2,
          typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
          add,
          size * (line + 1)
        );
      }
      if (line > 1) {
        image(
          ballons["bal00"],
          typingStyle[nowScene.name][1] - size / 2,
          typingStyle[nowScene.name][2] - size * (line - 1 + 1 / 2 + 1 / 4),
          add + size * 2,
          size * (line - 1)
        );
      }
    } else if (typingStyle[nowScene.name][0] == "RIGHT") {
      image(
        ballons["bal01"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal02"],
        typingStyle[nowScene.name][1] + (size * (-1 / 2 - 1) - add),
        typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal03"],
        typingStyle[nowScene.name][1] + (size * (-1 / 2 - 1) - add),
        typingStyle[nowScene.name][2] + size * (-1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal04"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (-1 + 1 / 4),
        size,
        size
      );
      image(
        ballons["bal11"],
        typingStyle[nowScene.name][1] - size / 2,
        typingStyle[nowScene.name][2] + size * (1 / 4),
        size,
        size
      );

      if (add > 0) {
        image(
          ballons["bal00"],
          typingStyle[nowScene.name][1] - size / 2 - add,
          typingStyle[nowScene.name][2] + size * (-line - 1 + 1 / 4),
          add,
          size * (line + 1)
        );
      }
      if (line > 1) {
        image(
          ballons["bal00"],
          typingStyle[nowScene.name][1] + size / 2 - add - size * 2,
          typingStyle[nowScene.name][2] - size * (line - 1 + 1 / 2 + 1 / 4),
          add + size * 2,
          size * (line - 1)
        );
      }
    }
  }
}
