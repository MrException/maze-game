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

  // Iterative maze carver using a stack instead of recursion
  function carveIterative() {
    // Start carving from random position
    const startX = random(width);
    const startY = random(height);
    
    // Stack to keep track of cells to visit
    const stack = [{ x: startX, y: startY }];
    
    // Directions: [dx, dy, wall to remove in current cell, wall to remove in next cell]
    const directions = [
      [0, -1, 'top', 'bottom'],     // up
      [1, 0, 'right', 'left'],      // right
      [0, 1, 'bottom', 'top'],      // down
      [-1, 0, 'left', 'right']      // left
    ];
    
    // Mark the starting cell as visited
    maze[startY][startX].visited = true;
    
    // Continue until we've visited all cells
    while (stack.length > 0) {
      // Get the current cell from the top of the stack
      const current = stack[stack.length - 1];
      const { x, y } = current;
      
      // Shuffle directions for randomness
      const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);
      
      // Find an unvisited neighbor
      let foundNeighbor = false;
      
      for (let [dx, dy, wall1, wall2] of shuffledDirections) {
        let newX = x + dx;
        let newY = y + dy;
        
        if (newX >= 0 && newX < width && newY >= 0 && newY < height 
            && !maze[newY][newX].visited) {
          // Remove walls between cells
          maze[y][x].walls[wall1] = false;
          maze[newY][newX].walls[wall2] = false;
          
          // Mark the new cell as visited
          maze[newY][newX].visited = true;
          
          // Push the new cell to the stack
          stack.push({ x: newX, y: newY });
          
          foundNeighbor = true;
          break;
        }
      }
      
      // If no unvisited neighbors, backtrack
      if (!foundNeighbor) {
        stack.pop();
      }
    }
  }

  // Generate the maze using the iterative approach
  carveIterative();

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

// Helper function to verify maze is solvable (iterative version)
function verifyMazeSolvable(maze, start, end) {
  const visited = new Set();
  const stack = [{ x: start.x, y: start.y }];
  
  while (stack.length > 0) {
    const { x, y } = stack.pop();
    const key = `${x},${y}`;
    
    // Check if we've reached the end
    if (x === end.x && y === end.y) return true;
    
    // Skip if out of bounds or already visited
    if (x < 0 || x >= maze[0].length || y < 0 || y >= maze.length || visited.has(key)) {
      continue;
    }
    
    visited.add(key);
    const cell = maze[y][x];
    
    // Add all possible moves to the stack
    if (!cell.walls.top) stack.push({ x, y: y-1 });
    if (!cell.walls.right) stack.push({ x: x+1, y });
    if (!cell.walls.bottom) stack.push({ x, y: y+1 });
    if (!cell.walls.left) stack.push({ x: x-1, y });
  }
  
  // If we've exhausted all possibilities without finding the end
  return false;
}
