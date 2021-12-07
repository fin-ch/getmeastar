function keyPressed() {
  // for alphabet keys
  if ((fieldSelector == "limited" || fieldSelector == "unlimited") && isScene == false) {
    if (fieldSelector == "limited") control = limited;
    if (fieldSelector == "unlimited") control = unlimited;

    switch (key.toLowerCase()) {
      case "a":
        fallingLadder.moveLeft();
        if (!control.isValidSpace(fallingLadder)) fallingLadder.moveRight();
        sfxs["02_moveladder"].play();
        break;

      case "s":
        fallingLadder.moveDown();
        if (!control.isValidSpace(fallingLadder)) fallingLadder.moveUp();
        else fallingLadder.resetBuffer();
        sfxs["02_moveladder"].play();
        break;

      case "d":
        fallingLadder.moveRight();
        if (!control.isValidSpace(fallingLadder)) fallingLadder.moveLeft();
        sfxs["02_moveladder"].play();
        break;

      case "z":
        fallingLadder.rotateCCW();
        // if not valid, rotate back
        if (!control.isValidSpace(fallingLadder)) fallingLadder.rotateCW();
        sfxs["03_rotateladder"].play();
        break;

      case "x":
        fallingLadder.rotateCW();
        // if not valid, rotate back
        if (!control.isValidSpace(fallingLadder)) fallingLadder.rotateCCW();
        sfxs["03_rotateladder"].play();
        break;

      case " ":
        hardDrop(fallingLadder, control);
        spawnNewLadder(control);
        break;

      case "p":
        prevfield = fieldSelector;
        fieldSelector = "pause";
        break;
    }

    // non-ASCII keys
    switch (keyCode) {
      // movement controls in html file
      // to handle repeated movement

      case UP_ARROW:
        playChar.moveUp();
        if (!control.isValidLadder(playChar)) playChar.moveDown();
        sfxs["07_movechar"].play();
        break;

      case DOWN_ARROW:
        playChar.moveDown();
        if (!control.isValidLadder(playChar)) playChar.moveUp();
        sfxs["07_movechar"].play();
        break;

      case LEFT_ARROW:
        playChar.moveLeft();
        if (!control.isValidLadder(playChar)) playChar.moveRight();
        sfxs["07_movechar"].play();
        break;

      case RIGHT_ARROW:
        playChar.moveRight();
        if (!control.isValidLadder(playChar)) playChar.moveLeft();
        sfxs["07_movechar"].play();
        break;
    }
  }

  if (isScene == true && (skipAble == true || isTutorial == false)) {
    switch (key.toLowerCase()) {
      case " ":
        if (
          currPage >= pages[sceneSelector] - 1 &&
          sceneSelector == "prologue"
        ) {
          endScene = true;
        } else if (
          currPage >= pages[sceneSelector] - 1 &&
          sceneSelector == "epilogueA"
        ) {
          endScene = true;
          fieldSelector = "wait";
        } else {
          nowScene.resetBuffer();
          initScene = false;
          currPage++;
        }
        break;

        case "p":
          prevfield = fieldSelector;
          fieldSelector = "pause";
          break;
    }
  }

  if (fieldSelector == "help") {
    switch (key.toLowerCase()) {
      case "r":
        fieldSelector = "wait";
        break;
    }
  }

  if (fieldSelector == "credit") {
    switch (key.toLowerCase()) {
      case "r":
        fieldSelector = "wait";
        break;
    }
  }
}
