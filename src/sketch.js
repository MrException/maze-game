import { generateMaze } from './maze-generator';

export const mySketch = (p) => {
  let maze;
  let cellSize;
  let player;
  let gameState = 'playing'; // playing, won, countdown
  let countdownTime = 0;
  let mazeSize = 50; // Initial maze size
  const padding = 50; // Padding around the maze
  const countdownDuration = 5; // seconds
  let difficultySlider;
  let winCount = 0;
  const keys = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.strokeWeight(2);
    p.background(255);
    
    // Create difficulty slider
    difficultySlider = p.createSlider(50, 200, mazeSize, 10);
    difficultySlider.position(20, 20);
    difficultySlider.style('width', '200px');
    difficultySlider.input(() => {
      if (gameState !== 'won') {
        mazeSize = difficultySlider.value();
        resetMaze();
      }
    });
    
    // Add label for the slider
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.fill(0);
    p.noStroke();
    p.text('Maze Size:', 20, 5);
    
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
        // Reset game with larger maze
        mazeSize = Math.min(maze.width + 10, 200);
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

    p.pop();
  };

  // Function to reset the maze
  const resetMaze = () => {
    // Show generating message
    p.background(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0);
    p.noStroke();
    p.text('Generating new maze...', p.width/2, p.height/2);
    
    // Use setTimeout to allow the message to be displayed before generating the maze
    setTimeout(() => {
      maze = generateMaze(mazeSize, mazeSize);
      
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
    }, 100); // Short delay to ensure message is visible
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
  };

  // Generate new maze on mouse click
  p.mouseClicked = () => {
    if (gameState !== 'won') {
      resetMaze();
    }
  };

  // Handle keyboard input for player movement
  p.keyPressed = () => {
    // Disable movement during countdown
    if (gameState !== 'playing') return false;
    
    const currentCell = maze.grid[player.y][player.x];
    
    switch (p.keyCode) {
      case keys.UP:
        if (!currentCell.walls.top) {
          player.y--;
        }
        break;
      case keys.RIGHT:
        if (!currentCell.walls.right) {
          player.x++;
        }
        break;
      case keys.DOWN:
        if (!currentCell.walls.bottom) {
          player.y++;
        }
        break;
      case keys.LEFT:
        if (!currentCell.walls.left) {
          player.x--;
        }
        break;
    }
    
    // Prevent default behavior for arrow keys
    return false;
  };
};
