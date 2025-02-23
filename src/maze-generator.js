export class Cell {
  constructor() {
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    this.visited = false;
  }
}

export const generateMaze = (width, height) => {
  // Initialize grid with cells
  let maze = Array(height).fill().map(() => 
    Array(width).fill().map(() => new Cell())
  );

  // Helper to get random integer
  const random = (max) => Math.floor(Math.random() * max);

  // Recursive maze carver
  function carve(x, y) {
    maze[y][x].visited = true;

    // Directions: [dx, dy, wall to remove in current cell, wall to remove in next cell]
    const directions = [
      [0, -1, 'top', 'bottom'],     // up
      [1, 0, 'right', 'left'],      // right
      [0, 1, 'bottom', 'top'],      // down
      [-1, 0, 'left', 'right']      // left
    ];
    
    // Shuffle directions
    directions.sort(() => Math.random() - 0.5);

    for (let [dx, dy, wall1, wall2] of directions) {
      let newX = x + dx;
      let newY = y + dy;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height 
          && !maze[newY][newX].visited) {
        // Remove walls between cells
        maze[y][x].walls[wall1] = false;
        maze[newY][newX].walls[wall2] = false;
        carve(newX, newY);
      }
    }
  }

  // Start carving from random position
  const startX = random(width);
  const startY = random(height);
  carve(startX, startY);

  // Set start and end points
  const start = { x: 0, y: height - 1 };
  const end = { x: width - 1, y: 0 };

  // Log verification that maze is generated
  console.log(`Generated ${width}x${height} maze`);
  console.log(`Start point: (${start.x}, ${start.y})`);
  console.log(`End point: (${end.x}, ${end.y})`);

  // Verify maze is solvable using simple flood fill
  const isSolvable = verifyMazeSolvable(maze, start, end);
  console.log(`Maze is ${isSolvable ? 'solvable' : 'not solvable'}`);

  return {
    grid: maze,
    start,
    end,
    width,
    height
  };
}

// Helper function to verify maze is solvable
function verifyMazeSolvable(maze, start, end) {
  const visited = new Set();
  
  function flood(x, y) {
    const key = `${x},${y}`;
    if (x === end.x && y === end.y) return true;
    if (x < 0 || x >= maze[0].length || y < 0 || y >= maze.length) return false;
    if (visited.has(key)) return false;
    
    visited.add(key);
    const cell = maze[y][x];
    
    if (!cell.walls.top && flood(x, y-1)) return true;
    if (!cell.walls.right && flood(x+1, y)) return true;
    if (!cell.walls.bottom && flood(x, y+1)) return true;
    if (!cell.walls.left && flood(x-1, y)) return true;
    
    return false;
  }
  
  return flood(start.x, start.y);
}
