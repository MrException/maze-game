import { generateMaze } from './maze-generator';
import { TouchControls } from './touch-controls';

export const mySketch = (p) => {
  let maze;
  let cellSize;
  let player;
  let gameState = 'playing'; // playing, won, countdown
  let countdownTime = 0;
  let mazeSize = 10; // Initial maze size
  const padding = 50; // Padding around the maze
  const countdownDuration = 2; // seconds
  let difficultySlider;
  let winCount = 0;
  let touchControls;
  const keys = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
  };
  // Track which keys are currently pressed
  const keysPressed = {
    UP: false,
    RIGHT: false,
    DOWN: false,
    LEFT: false
  };
  // Movement cooldown to control speed
  let lastMoveTime = 0;
  const moveCooldown = 100; // milliseconds between moves

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.strokeWeight(2);
    p.background(255);
    
    // Initialize touch controls
    touchControls = new TouchControls(p);
    const hasTouchControls = touchControls.init();
    
    // Set up callbacks for touch controls
    touchControls.onDirectionChange = (direction, isPressed) => {
      keysPressed[direction] = isPressed;
      if (isPressed && gameState === 'playing') {
        handleContinuousMovement();
      }
    };
    
    // Remove the touch click handler that regenerates the maze
    touchControls.onTouchClick = null;
    
    // Create difficulty slider - positioned at bottom of screen and full width
    difficultySlider = p.createSlider(10, 200, mazeSize, 1); // Changed step to 1 for finer control
    difficultySlider.position(20, p.height - 40); // Position at bottom with some padding
    difficultySlider.style('width', `${p.width - 40}px`); // Make it almost full width

    // Use both input and changed events to ensure it works
    difficultySlider.input(() => {
      if (gameState !== 'won') {
        console.log('Slider value changed to:', difficultySlider.value());
        mazeSize = difficultySlider.value();
        resetMaze();
      }
    });

    // Also add changed event as a backup
    difficultySlider.changed(() => {
      if (gameState !== 'won') {
        console.log('Slider value changed (changed event) to:', difficultySlider.value());
        mazeSize = difficultySlider.value();
        resetMaze();
      }
    });
    
    // Add label for the slider at the bottom
    p.textAlign(p.LEFT, p.BOTTOM);
    p.textSize(16);
    p.fill(0);
    p.noStroke();
    p.text('Maze Size:', 20, p.height - 45);
    
    // Generate initial maze
    maze = generateMaze(mazeSize, mazeSize);
    
    // Calculate cell size to fit maze in canvas with padding
    const availableWidth = p.width - (padding * 2);
    const availableHeight = p.height - (padding * 2);
    cellSize = Math.min(
      availableWidth / maze.width,
      availableHeight / maze.height
    );
    
    // Initialize player at the start position
    player = {
      x: maze.start.x,
      y: maze.start.y
    };
    
    console.log('Maze generation complete!');
    console.log('Player starting at:', player);
  };

  p.draw = () => {
    p.background(255);
    
    // Handle continuous movement when keys are held down
    if (gameState === 'playing' && p.millis() - lastMoveTime > moveCooldown) {
      handleContinuousMovement();
    }
    
    // Display win counter
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.fill(0);
    p.noStroke();
    p.text(`Wins: ${winCount}`, 20, 50);
    p.text(`Maze Size: ${maze.width}x${maze.height}`, 20, 70);
    
    // Center the maze
    p.push();
    p.translate(
      (p.width - (maze.width * cellSize)) / 2,
      (p.height - (maze.height * cellSize)) / 2
    );
    
    // Draw maze
    p.stroke(0);
    for (let y = 0; y < maze.height; y++) {
      for (let x = 0; x < maze.width; x++) {
        const cell = maze.grid[y][x];
        const px = x * cellSize;
        const py = y * cellSize;
        
        // Draw walls
        if (cell.walls.top) {
          p.line(px, py, px + cellSize, py);
        }
        if (cell.walls.right) {
          p.line(px + cellSize, py, px + cellSize, py + cellSize);
        }
        if (cell.walls.bottom) {
          p.line(px, py + cellSize, px + cellSize, py + cellSize);
        }
        if (cell.walls.left) {
          p.line(px, py, px, py + cellSize);
        }
      }
    }
    
    // Mark start and end points
    p.noStroke();
    // Start point (green)
    p.fill(0, 255, 0);
    p.circle(
      maze.start.x * cellSize + cellSize/2,
      maze.start.y * cellSize + cellSize/2,
      cellSize/2
    );
    // End point (red)
    p.fill(255, 0, 0);
    p.circle(
      maze.end.x * cellSize + cellSize/2,
      maze.end.y * cellSize + cellSize/2,
      cellSize/2
    );
    
    // Draw player (green dot)
    p.noStroke();
    p.fill(0, 255, 0);
    p.circle(
      player.x * cellSize + cellSize/2,
      player.y * cellSize + cellSize/2,
      cellSize * 0.8
    );
    
    p.pop();
    
    // Draw touch controls (after popping the matrix)
    touchControls.draw();
    
    // Check win condition
    if (player.x === maze.end.x && player.y === maze.end.y && gameState === 'playing') {
      gameState = 'won';
      countdownTime = p.millis() + (countdownDuration * 1000);
      winCount++;
      // Hide slider during countdown
      difficultySlider.style('visibility', 'hidden');
      console.log('Won! Starting countdown...');
    }

    // Handle countdown and reset
    if (gameState === 'won') {
      const timeLeft = Math.ceil((countdownTime - p.millis()) / 1000);
      
      if (timeLeft <= 0) {
        // Reset game with slightly larger maze (increase by 2 instead of 10)
        mazeSize = Math.min(maze.width + 2, 200);
        difficultySlider.value(mazeSize);
        // Show slider again
        difficultySlider.style('visibility', 'visible');
        resetMaze();
      } else {
        // Draw win message and countdown
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.fill(0);
        p.noStroke();
        p.text('You win!', p.width/2, p.height/2 - 20);
        p.textSize(24);
        p.text(`New maze in ${timeLeft}...`, p.width/2, p.height/2 + 20);
      }
    }
  };

  // Function to reset the maze
  const resetMaze = () => {
    // Reset all key states
    keysPressed.UP = false;
    keysPressed.RIGHT = false;
    keysPressed.DOWN = false;
    keysPressed.LEFT = false;
    
    // Show generating message
    p.background(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0);
    p.noStroke();
    p.text('Generating new maze...', p.width/2, p.height/2);
    
    console.log('Generating new maze with size:', mazeSize);
    
    // Use requestAnimationFrame instead of setTimeout for better browser compatibility
    requestAnimationFrame(() => {
      maze = generateMaze(mazeSize, mazeSize);
      
      console.log('New maze generated with dimensions:', maze.width, 'x', maze.height);
      
      // Recalculate cell size
      const availableWidth = p.width - (padding * 2);
      const availableHeight = p.height - (padding * 2);
      cellSize = Math.min(
        availableWidth / maze.width,
        availableHeight / maze.height
      );
      
      // Reset player position
      player = {
        x: maze.start.x,
        y: maze.start.y
      };
      
      gameState = 'playing';
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    // Recalculate cell size
    const availableWidth = p.width - (padding * 2);
    const availableHeight = p.height - (padding * 2);
    cellSize = Math.min(
      availableWidth / maze.width,
      availableHeight / maze.height
    );
    
    // Update slider position and width when window is resized
    difficultySlider.position(20, p.height - 40);
    difficultySlider.style('width', `${p.width - 40}px`);
    
    // Update touch controls
    touchControls.resize();
  };

  // Function to handle continuous movement
  const handleContinuousMovement = () => {
    const currentCell = maze.grid[player.y][player.x];
    let moved = false;
    
    // Process movement in priority order (first pressed key gets priority)
    if (keysPressed.UP && !currentCell.walls.top) {
      player.y--;
      moved = true;
    } else if (keysPressed.RIGHT && !currentCell.walls.right) {
      player.x++;
      moved = true;
    } else if (keysPressed.DOWN && !currentCell.walls.bottom) {
      player.y++;
      moved = true;
    } else if (keysPressed.LEFT && !currentCell.walls.left) {
      player.x--;
      moved = true;
    }
    
    if (moved) {
      lastMoveTime = p.millis();
    }
  };

  // Handle key press events
  p.keyPressed = () => {
    // Disable movement during countdown
    if (gameState !== 'playing') return true; // Return true for non-game keys during countdown
    
    // Only handle arrow keys, let other keys pass through
    if (![keys.UP, keys.RIGHT, keys.DOWN, keys.LEFT].includes(p.keyCode)) {
      return true; // Let browser handle non-arrow keys
    }
    
    // Set the key as pressed
    switch (p.keyCode) {
      case keys.UP:
        keysPressed.UP = true;
        break;
      case keys.RIGHT:
        keysPressed.RIGHT = true;
        break;
      case keys.DOWN:
        keysPressed.DOWN = true;
        break;
      case keys.LEFT:
        keysPressed.LEFT = true;
        break;
    }
    
    // Force an immediate move when key is first pressed
    handleContinuousMovement();
    
    // Prevent default behavior only for arrow keys
    return false;
  };
  
  // Handle key release events
  p.keyReleased = () => {
    // Only handle arrow keys
    switch (p.keyCode) {
      case keys.UP:
        keysPressed.UP = false;
        break;
      case keys.RIGHT:
        keysPressed.RIGHT = false;
        break;
      case keys.DOWN:
        keysPressed.DOWN = false;
        break;
      case keys.LEFT:
        keysPressed.LEFT = false;
        break;
    }
    
    // Let other keys pass through
    return true;
  };
  
  // Handle touch events
  p.touchStarted = () => {
    if (p.touches.length > 0) {
      touchControls.handleTouchStart(p.touches[0].x, p.touches[0].y);
    }
    return false; // Prevent default
  };
  
  p.touchEnded = () => {
    touchControls.handleTouchEnd();
    return false; // Prevent default
  };
  
  p.touchMoved = () => {
    if (p.touches.length > 0) {
      touchControls.handleTouchMove(p.touches[0].x, p.touches[0].y);
    }
    return false; // Prevent default
  };
};
