export const  generateMaze = (width, height) => {
  // Initialize grid with walls
  let maze = Array(height).fill().map(() => Array(width).fill('#'));

  // Helper to get random integer
  const random = (max) => Math.floor(Math.random() * max);

  // Recursive maze carver
  function carve(x, y) {
    maze[y][x] = '.';

    // Directions: [dx, dy]
    const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]];
    directions.sort(() => Math.random() - 0.5);

    for (let [dx, dy] of directions) {
      let newX = x + dx;
      let newY = y + dy;

      if (newX > 0 && newX < width - 1 && newY > 0 && newY < height - 1
        && maze[newY][newX] === '#') {
        // Carve path between cells
        maze[y + dy / 2][x + dx / 2] = '.';
        carve(newX, newY);
      }
    }
  }

  // Start carving from random even coordinates
  carve(1 + 2 * random((width - 1) / 2), 1 + 2 * random((height - 1) / 2));

  // Place start and end
  maze[height - 2][1] = 'S';
  maze[1][width - 2] = 'E';

  // Convert to string
  return maze.map(row => row.join('')).join('\n');
}