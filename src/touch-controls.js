// Touch controls for maze game
export class TouchControls {
  constructor(p5Instance) {
    this.p = p5Instance;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.touchButtons = {
      up: { x: 0, y: 0, width: 0, height: 0 },
      right: { x: 0, y: 0, width: 0, height: 0 },
      down: { x: 0, y: 0, width: 0, height: 0 },
      left: { x: 0, y: 0, width: 0, height: 0 }
    };
    
    // For swipe detection
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.minSwipeDistance = 30;
    
    // Callback functions to be set from outside
    this.onDirectionChange = null;
    this.onTouchClick = null;
  }

  init() {
    if (this.isTouchDevice) {
      this.positionTouchButtons();
    }
    return this.isTouchDevice;
  }

  positionTouchButtons() {
    // Make buttons smaller on mobile
    const buttonSize = Math.min(this.p.width, this.p.height) * 0.12;
    
    // Position in bottom left corner with padding
    const padding = buttonSize * 0.5;
    const centerX = padding + buttonSize * 1.5;
    const centerY = this.p.height - padding - buttonSize * 1.5;
    
    this.touchButtons.up = { 
      x: centerX - buttonSize/2, 
      y: centerY - buttonSize, 
      width: buttonSize, 
      height: buttonSize 
    };
    this.touchButtons.right = { 
      x: centerX + buttonSize, 
      y: centerY, 
      width: buttonSize, 
      height: buttonSize 
    };
    this.touchButtons.down = { 
      x: centerX - buttonSize/2, 
      y: centerY + buttonSize, 
      width: buttonSize, 
      height: buttonSize 
    };
    this.touchButtons.left = { 
      x: centerX - buttonSize, 
      y: centerY, 
      width: buttonSize, 
      height: buttonSize 
    };
  }

  draw() {
    if (!this.isTouchDevice) return;
    
    this.p.push();
    this.p.fill(200, 200, 200, 150); // Semi-transparent gray
    this.p.stroke(100);
    
    // Draw up button with triangle
    this.p.rect(this.touchButtons.up.x, this.touchButtons.up.y, 
                this.touchButtons.up.width, this.touchButtons.up.height, 10);
    this.p.fill(50);
    this.p.triangle(
      this.touchButtons.up.x, this.touchButtons.up.y + this.touchButtons.up.height * 0.7,
      this.touchButtons.up.x + this.touchButtons.up.width / 2, this.touchButtons.up.y + this.touchButtons.up.height * 0.3,
      this.touchButtons.up.x + this.touchButtons.up.width, this.touchButtons.up.y + this.touchButtons.up.height * 0.7
    );
    
    // Draw right button with triangle
    this.p.fill(200, 200, 200, 150);
    this.p.rect(this.touchButtons.right.x, this.touchButtons.right.y, 
                this.touchButtons.right.width, this.touchButtons.right.height, 10);
    this.p.fill(50);
    this.p.triangle(
      this.touchButtons.right.x + this.touchButtons.right.width * 0.3, this.touchButtons.right.y,
      this.touchButtons.right.x + this.touchButtons.right.width * 0.7, this.touchButtons.right.y + this.touchButtons.right.height / 2,
      this.touchButtons.right.x + this.touchButtons.right.width * 0.3, this.touchButtons.right.y + this.touchButtons.right.height
    );
    
    // Draw down button with triangle
    this.p.fill(200, 200, 200, 150);
    this.p.rect(this.touchButtons.down.x, this.touchButtons.down.y, 
                this.touchButtons.down.width, this.touchButtons.down.height, 10);
    this.p.fill(50);
    this.p.triangle(
      this.touchButtons.down.x, this.touchButtons.down.y + this.touchButtons.down.height * 0.3,
      this.touchButtons.down.x + this.touchButtons.down.width / 2, this.touchButtons.down.y + this.touchButtons.down.height * 0.7,
      this.touchButtons.down.x + this.touchButtons.down.width, this.touchButtons.down.y + this.touchButtons.down.height * 0.3
    );
    
    // Draw left button with triangle
    this.p.fill(200, 200, 200, 150);
    this.p.rect(this.touchButtons.left.x, this.touchButtons.left.y, 
                this.touchButtons.left.width, this.touchButtons.left.height, 10);
    this.p.fill(50);
    this.p.triangle(
      this.touchButtons.left.x + this.touchButtons.left.width * 0.7, this.touchButtons.left.y,
      this.touchButtons.left.x + this.touchButtons.left.width * 0.3, this.touchButtons.left.y + this.touchButtons.left.height / 2,
      this.touchButtons.left.x + this.touchButtons.left.width * 0.7, this.touchButtons.left.y + this.touchButtons.left.height
    );
    
    this.p.pop();
  }

  handleTouchStart(x, y) {
    if (!this.isTouchDevice) return false;
    
    this.touchStartX = x;
    this.touchStartY = y;
    
    // Check which button was pressed
    if (this.isPointInRect(x, y, this.touchButtons.up)) {
      if (this.onDirectionChange) this.onDirectionChange('UP', true);
      return true;
    } else if (this.isPointInRect(x, y, this.touchButtons.right)) {
      if (this.onDirectionChange) this.onDirectionChange('RIGHT', true);
      return true;
    } else if (this.isPointInRect(x, y, this.touchButtons.down)) {
      if (this.onDirectionChange) this.onDirectionChange('DOWN', true);
      return true;
    } else if (this.isPointInRect(x, y, this.touchButtons.left)) {
      if (this.onDirectionChange) this.onDirectionChange('LEFT', true);
      return true;
    }
    // Removed the onTouchClick handler
    
    return false;
  }

  handleTouchEnd() {
    if (!this.isTouchDevice) return false;
    
    // Reset all directions
    if (this.onDirectionChange) {
      this.onDirectionChange('UP', false);
      this.onDirectionChange('RIGHT', false);
      this.onDirectionChange('DOWN', false);
      this.onDirectionChange('LEFT', false);
    }
    
    return true;
  }

  handleTouchMove(x, y) {
    if (!this.isTouchDevice) return false;
    
    const dx = x - this.touchStartX;
    const dy = y - this.touchStartY;
    
    // Only process if we've moved far enough to count as a swipe
    if (Math.abs(dx) > this.minSwipeDistance || Math.abs(dy) > this.minSwipeDistance) {
      // Determine swipe direction
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && this.onDirectionChange) {
          this.onDirectionChange('RIGHT', true);
        } else if (this.onDirectionChange) {
          this.onDirectionChange('LEFT', true);
        }
      } else {
        // Vertical swipe
        if (dy > 0 && this.onDirectionChange) {
          this.onDirectionChange('DOWN', true);
        } else if (this.onDirectionChange) {
          this.onDirectionChange('UP', true);
        }
      }
      
      // Reset touch start position
      this.touchStartX = x;
      this.touchStartY = y;
      return true;
    }
    
    return false;
  }

  resize() {
    if (this.isTouchDevice) {
      this.positionTouchButtons();
    }
  }

  // Helper function to check if a point is inside a rectangle
  isPointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width &&
           y >= rect.y && y <= rect.y + rect.height;
  }
}
