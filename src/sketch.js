import { generateMaze } from './maze-generator';

export const mySketch = (p) => {
  let maze;
  let cellSize;
  let player;
  const mazeSize = 15; // Initial maze size
  const padding = 50; // Padding around the maze
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
    maze = generateMaze(mazeSize, mazeSize);
    player = {
      x: maze.start.x,
      y: maze.start.y
    };
  };

  // Handle keyboard input for player movement
  p.keyPressed = () => {
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
