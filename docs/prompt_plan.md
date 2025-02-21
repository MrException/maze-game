## 1. High-Level Blueprint

**Overview:**  
We are building a web-based maze-solving game using p5.js and plain HTML/CSS/JavaScript. The game consists of a maze (generated via DFS backtracking) displayed on a 500×500 canvas, a player (a green dot) that moves cell-by-cell in cardinal directions, and a finish square (red). The game also has a difficulty slider for setting the initial maze size and automatically increases difficulty after each win.

**Main Components:**

1. **Project Setup:**  
   - Create the project structure with an HTML file, a CSS file, and a JavaScript file.
   - Set up p5.js and initialize a 500×500 canvas.

2. **Maze Generation:**  
   - Implement a DFS-based maze generation algorithm.
   - Represent the maze as a grid with walls defined between cells.
   - Ensure the maze is always solvable.

3. **Maze Rendering:**  
   - Use p5.js drawing functions to render the maze on the canvas.
   - Draw walls in black on a white background.

4. **Player Movement:**  
   - Represent the player as a green dot.
   - Listen for key events to move the player (up, down, left, right).
   - Validate movement against walls to ensure legal moves only.

5. **Win Condition & Game Loop:**  
   - Set the finish square (red) at the opposite side.
   - Detect when the player reaches the finish, display a “You win!” message, and trigger a 5-second countdown.
   - Generate a new, slightly larger maze (up to a 100×100 maximum) after each win.

6. **Difficulty Scaling & UI:**  
   - Integrate a slider that lets users set the initial maze size (50×50 to 200×200).
   - Hide the slider and show a “Generating new maze…” message along with a 5-second countdown when a new maze is being generated.
   - Update the win counter that persists during the session.

7. **Testing & Debugging Tools:**  
   - Build in test hooks such as an “instant complete” tool.
   - Ensure edge cases (like multiple key presses or slider changes during a countdown) are handled gracefully.

8. **Final Integration & Polish:**  
   - Wire all components together.
   - Clean up code and ensure comprehensive testing at each incremental step.

---

## 2. Iterative Breakdown into Chunks

### **Step 1: Project Setup**
- **Chunk 1.1:** Create the project folder structure with HTML, CSS, and JavaScript files.
- **Chunk 1.2:** Add the p5.js library to the project and initialize a basic 500×500 canvas.
- **Chunk 1.3:** Write a simple “Hello Canvas” test to verify that p5.js is rendering.

### **Step 2: Maze Generation Module**
- **Chunk 2.1:** Define the maze data structure (a grid of cells with walls).
- **Chunk 2.2:** Implement a function to initialize the grid.
- **Chunk 2.3:** Code the DFS maze generation algorithm with backtracking.
- **Chunk 2.4:** Write unit tests (or simple logging) to confirm the maze is generated correctly and always solvable.

### **Step 3: Maze Rendering**
- **Chunk 3.1:** Create a function that reads the maze data structure and draws walls on the p5.js canvas.
- **Chunk 3.2:** Validate rendering with a static or generated maze.
- **Chunk 3.3:** Ensure the drawing scales correctly based on the maze size and constant wall thickness.

### **Step 4: Implementing Player Movement**
- **Chunk 4.1:** Create a player object (green dot) with a starting position.
- **Chunk 4.2:** Set up key event listeners for arrow keys.
- **Chunk 4.3:** Implement movement logic that checks for walls and allows only valid moves.
- **Chunk 4.4:** Test movement by simulating key presses and confirming the player doesn’t pass through walls.

### **Step 5: Win Condition & Game Loop**
- **Chunk 5.1:** Place the finish square (red) at the opposite side of the maze.
- **Chunk 5.2:** Implement a check for when the player reaches the finish square.
- **Chunk 5.3:** On win, display a “You win!” message and initiate a 5-second countdown.
- **Chunk 5.4:** After the countdown, generate a new maze with an increased size (up to 100×100).
- **Chunk 5.5:** Disable movement during the countdown and re-enable afterward.

### **Step 6: Difficulty Slider & UI Components**
- **Chunk 6.1:** Add a difficulty slider to the UI (HTML and CSS).
- **Chunk 6.2:** Implement slider change events to generate a new maze with the chosen difficulty.
- **Chunk 6.3:** Ensure the slider is hidden during the countdown with a “Generating new maze…” message.
- **Chunk 6.4:** Create and update a win counter display.

### **Step 7: Debugging & Testing Tools**
- **Chunk 7.1:** Implement an instant completion tool for testing win conditions.
- **Chunk 7.2:** Test edge cases such as rapid key presses and quick slider changes.
- **Chunk 7.3:** Validate that each component logs its activity for easier debugging.

### **Step 8: Final Integration & Polishing**
- **Chunk 8.1:** Wire together all modules (maze generation, rendering, player movement, win condition, UI).
- **Chunk 8.2:** Perform integration tests to verify that components interact correctly.
- **Chunk 8.3:** Refactor code for clarity, performance, and maintainability.
- **Chunk 8.4:** Finalize documentation and in-code comments.

---

## 3. Series of TDD Prompts for a Code-Generation LLM

Below is a series of prompts. Each prompt builds on the previous work and ensures that code is developed incrementally with testing and proper integration.

---

### **Prompt 1: Project Setup and Basic Canvas**

```text
# Prompt 1: Project Setup and Basic Canvas

We are building a maze-solving game using p5.js. For the first step, please create the initial project structure. This includes:

1. An HTML file that:
   - Loads the p5.js library.
   - Loads a main JavaScript file.
   - Contains a <canvas> or div for the p5.js sketch.

2. A CSS file with basic styling for the page.

3. A JavaScript file that initializes a 500×500 p5.js canvas and displays a simple “Hello, Canvas!” message on the canvas for testing purposes.

Ensure that the project structure is ready to be integrated with future components. Use best practices and add comments where necessary.
```

---

### **Prompt 2: Maze Data Structure and DFS Maze Generation**

```text
# Prompt 2: Maze Data Structure and DFS Maze Generation

Based on the project setup, please implement the maze generation module. This prompt requires you to:

1. Define a data structure for the maze as a grid of cells, where each cell has information about its walls.
2. Create a function to initialize the grid for a given maze size.
3. Implement the maze generation algorithm using DFS with backtracking to carve passages between cells.
4. Include simple logging or tests to verify that the maze is generated and is always solvable.

Ensure the code is modular so that it can be later used by the rendering module. Add appropriate comments and maintain a test-driven approach.
```

---

### **Prompt 3: Maze Rendering with p5.js**

```text
# Prompt 3: Maze Rendering with p5.js

Now that we have a maze data structure and generation logic, please implement the rendering function. This prompt requires you to:

1. Write a function that takes the generated maze data structure and draws it on the 500×500 canvas using p5.js.
2. Use black for the walls and a white background.
3. Ensure that the cell size is calculated based on the maze dimensions so that the entire maze fits in the canvas.
4. Include a simple test where a generated maze is rendered to visually verify correctness.

Make sure to add comments and maintain modular code so that future prompts can build on this rendering logic.
```

---

### **Prompt 4: Player Movement Implementation**

```text
# Prompt 4: Player Movement Implementation

With maze generation and rendering in place, please implement the player movement functionality. The requirements are:

1. Create a player object represented as a green dot, with an initial position near one side of the maze.
2. Set up key event listeners for the arrow keys (up, down, left, right).
3. Implement logic to move the player one cell at a time, ensuring movement is only allowed if there is no wall blocking the path.
4. Write tests or logging to verify that movement is restricted correctly (e.g., the player does not move through walls).

Ensure the movement code integrates with the maze data structure and rendering, and add comments for clarity.
```

---

### **Prompt 5: Win Condition and Game Loop**

```text
# Prompt 5: Win Condition and Game Loop

Now, implement the win condition and game loop. This prompt should:

1. Define a finish square (red) located on the opposite side of the maze from the player’s starting position.
2. Implement a check to detect when the player reaches the finish square.
3. When a win is detected:
   - Display a “You win!” message.
   - Start a 5-second countdown during which movement is disabled.
   - After the countdown, clear the maze and generate a new maze that is slightly larger (increasing maze size by 10 cells, capped at 100×100).
4. Ensure that the UI updates (win message, countdown) are integrated with the existing components.

Use best practices and test the win condition thoroughly.
```

---

### **Prompt 6: Difficulty Slider and UI Enhancements**

```text
# Prompt 6: Difficulty Slider and UI Enhancements

Next, add the user interface elements for difficulty adjustment and game feedback. This prompt should:

1. Implement an HTML slider (range input) that allows the user to set the initial maze size (between 50×50 and 200×200).
2. Write JavaScript to handle slider change events such that:
   - The current maze is cleared.
   - A “Generating new maze…” message is displayed.
   - The slider is hidden during a 5-second countdown, after which a new maze based on the slider value is generated and the slider reappears.
3. Integrate a win counter that updates each time the player wins.
4. Ensure that all UI elements are wired with the game logic and that the game state is updated consistently.

Make sure all code is modular, commented, and testable.
```

---

### **Prompt 7: Debugging Tools and Final Integration**

```text
# Prompt 7: Debugging Tools and Final Integration

Finally, complete the integration of all modules and add debugging tools. This prompt should:

1. Implement an “instant completion” tool/button that, when activated, forces a win condition for testing purposes.
2. Ensure that all modules (maze generation, rendering, player movement, win condition, UI) are correctly wired together.
3. Add logging or visual cues for debugging purposes, ensuring that edge cases (like multiple key presses or rapid slider changes) are handled.
4. Refactor and clean up the codebase for maintainability.
5. Write integration tests or provide detailed instructions on how to manually test each component.

This final prompt should produce a fully working, testable maze-solving game with incremental progress verified through early tests.
```

---
