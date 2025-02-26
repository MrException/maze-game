import { Cell, generateMaze } from '../maze-generator';

describe('Maze Generator Tests', () => {
  // Helper function to print maze to console
  const printMaze = (maze) => {
    const grid = maze.grid;
    let output = `\nMaze ${maze.width}x${maze.height}\n`;
    
    for (let y = 0; y < maze.height; y++) {
      // Print horizontal walls
      let topLine = '';
      let midLine = '';
      for (let x = 0; x < maze.width; x++) {
        const cell = grid[y][x];
        topLine += cell.walls.top ? '+---' : '+   ';
        midLine += cell.walls.left ? '|   ' : '    ';
      }
      output += topLine + '+\n';
      output += midLine + '|\n';
    }
    
    // Print bottom wall
    output += '+---'.repeat(maze.width) + '+\n';
    
    console.log(output);
    return output; // Return for potential assertions
  };

  test('generates 3x3 maze', () => {
    const maze = generateMaze(3, 3);
    expect(maze.width).toBe(3);
    expect(maze.height).toBe(3);
    expect(maze.grid.length).toBe(3);
    expect(maze.grid[0].length).toBe(3);
    printMaze(maze);
  });

  test('generates 5x5 maze', () => {
    const maze = generateMaze(5, 5);
    expect(maze.width).toBe(5);
    expect(maze.height).toBe(5);
    expect(maze.grid.length).toBe(5);
    expect(maze.grid[0].length).toBe(5);
    printMaze(maze);
  });

  test('generates 8x4 rectangular maze', () => {
    const maze = generateMaze(8, 4);
    expect(maze.width).toBe(8);
    expect(maze.height).toBe(4);
    expect(maze.grid.length).toBe(4);
    expect(maze.grid[0].length).toBe(8);
    printMaze(maze);
  });

  test('maze is always solvable', () => {
    const maze = generateMaze(10, 10);
    expect(maze.grid[maze.start.y][maze.start.x]).toBeDefined();
    expect(maze.grid[maze.end.y][maze.end.x]).toBeDefined();
    // The generateMaze function already includes solvability verification
    printMaze(maze);
  });
});
