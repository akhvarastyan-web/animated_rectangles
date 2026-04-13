import { CONFIG } from '../config';

export class ScrollPhysics {
  private velocity = 0;

  private dragging = false;

  startDrag() {
    this.dragging = true;
    this.velocity = 0;
  }

  updateFromDrag(delta: number) {
    this.velocity = delta;
  }

  endDrag() {
    this.dragging = false;
  }

  applyWheel(delta: number) {
    const targetImpulse = delta * CONFIG.PHYSICS.WHEEL_SENSITIVITY;

    this.velocity = this.velocity * 0.7 + targetImpulse * 0.3;

    const max = CONFIG.PHYSICS.MAX_VELOCITY;

    if (Math.abs(this.velocity) > max) {
      this.velocity = max * Math.sign(this.velocity);
    }
  }

  tick(): number {
    if (this.dragging) {
      return 0;
    }

    if (Math.abs(this.velocity) < CONFIG.PHYSICS.MIN_VELOCITY) {
      this.velocity = 0;

      return 0;
    }

    this.velocity *= CONFIG.PHYSICS.FRICTION;

    return this.velocity;
  }

  stop() {
    this.velocity = 0;
  }
}
