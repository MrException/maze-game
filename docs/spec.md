# Maze-Solving Game - Developer Specification

## Overview
This is a simple web-based maze-solving game where the player controls a green dot using arrow keys to navigate through a randomly generated maze. The goal is to reach the red finish square on the opposite side of the maze. The game progressively increases in difficulty by enlarging the maze after each win.

## Technical Stack
- **Rendering & Interaction:** p5.js
- **UI Components:** HTML, CSS, JavaScript
- **Game Logic:** JavaScript

---

## Core Gameplay Mechanics
- The player controls a **green dot** that moves **one cell at a time**.
- Movement is **strictly in cardinal directions** (up, down, left, right).
- The player starts in a random position near one side of the maze.
- The finish position is a **red square** on the opposite side of the maze.
- Walls block movement; pressing a movement key against a wall does nothing.
- There are **no animations, physics, or acceleration**—movement is instant.
- The game does **not store any state between sessions**—refreshing resets everything.

---

## Maze Generation
- **Algorithm:** Depth-First Search (DFS) with backtracking.
- The maze **always has a solution**, but can have multiple solutions.
- The maze **contains dead ends** and **long, winding paths**.
- The maze is drawn using **black walls** on a **white background**.
- **Wall thickness is constant**.
- The maze is defined **only by the walls**—no visible grid overlay.
- The maze size increases **by 10 cells per win** until it reaches **100x100**.
- **Fixed canvas size:** 500x500 pixels (no resizing, clipping, or scrolling).
- **Cell size:** Approximately 5x5 pixels.

---

## Difficulty System
- A **slider** allows users to set the initial difficulty (maze size between **50x50 and 200x200**).
- The slider is **always visible** and updates the maze **instantly** when adjusted.
- If the slider is changed:
  - The current maze disappears.
  - A **"Generating new maze..." message** appears.
  - A **5-second countdown** follows before the new maze is shown.
  - The **slider is hidden** during the countdown and reappears after the new maze is generated.
- Difficulty progression **is independent of the slider**—wins always increase maze size by 10 cells.
- Once the maze reaches **100x100**, it stays at that size indefinitely.

---

## Win Condition & Game Loop
- When the player reaches the finish:
  - A **"You win!" message** is displayed.
  - A **5-second countdown** starts.
  - The **maze disappears**.
  - A new, harder maze **instantly appears** after the countdown.
- While the countdown is active, **movement keys are disabled**.

---

## User Interface Elements
- **Canvas:** 500x500 pixels for maze rendering (p5.js).
- **Difficulty Slider:**
  - Controls initial maze size (50x50 to 200x200).
  - Hidden during countdown when a new maze is being generated.
- **Win Counter:** Displays number of wins (persists across mazes but resets on refresh).
- **Messages:** "Generating new maze...", "You win!", and countdown text.

---

## Debugging & Testing Tools
- **Instant Completion Tool:** Allows instant maze completion for testing.
- **Edge Case Testing:**
  - Verify that all generated mazes are solvable.
  - Ensure walls properly prevent movement.
  - Confirm the win condition triggers correctly.
  - Check proper UI behavior when changing the slider rapidly.

---

## Error Handling
- If a user presses multiple keys at once, **only the most recent key press is processed**.
- Prevent movement during countdown periods.
- Prevent infinite loops or crashes in maze generation.

---

## Future Considerations
- Potential enhancements: sound effects, visual effects (e.g., flash on win), alternative maze generation algorithms.
- Challenge modes (e.g., timed mode) could be explored later.

---

## Development Roadmap
1. **Set up the project:** p5.js environment, canvas rendering.
2. **Implement maze generation:** DFS with backtracking.
3. **Implement player movement:** grid-based, cardinal directions.
4. **Add win condition and maze reset logic.**
5. **Implement difficulty scaling:** slider + automatic progression.
6. **Handle UI elements:** messages, countdown, hiding/showing the slider.
7. **Testing & debugging tools.**
8. **Final polish and optimizations.**

---
