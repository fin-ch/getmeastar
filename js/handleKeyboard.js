/*
console.log('keyboard')

document.addEventListener('keydown', event => {
    if ([32, 37, 38, 39, 40].includes(event.keyCode)) {
    	event.preventDefault();
    }
    
    if(fieldSelector != 0){
    
    if(fieldSelector == 1) control = limited;
    if(fieldSelector == 2) control = unlimited;
      
    switch (event.keyCode) {
        
      // Down arrow
      case 40:
      	fallingLadder.moveDown();
        if (!control.isValid(fallingLadder))
          fallingLadder.moveUp()
        else
          fallingLadder.resetBuffer()
        break;
        
      // Left arrow
      case 37:
      	fallingLadder.moveLeft();
        if (!control.isValid(fallingLadder))
          console.log(fallingLadder);
          fallingLadder.moveRight()
        break;

      // Right Arrow
      case 39:
      	fallingLadder.moveRight();
        if (!control.isValid(fallingLadder))
          fallingLadder.moveLeft()
        break;         
    }
    }
        
});
*/