import * as PIXI from 'pixi.js';
import { InputEvents } from '../types';

export class InputController {
  private dragging = false;

  private lastX = 0;

  constructor(
    private view: HTMLCanvasElement,
    private stage: PIXI.Container,
    private events: InputEvents,
  ) {
    this.init();
  }

  private init() {
    this.stage.eventMode = 'static';
    this.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.view.width,
      this.view.height,
    );

    this.stage.on('pointerdown', this.onDown);
    this.stage.on('pointermove', this.onMove);

    window.addEventListener('pointerup', this.onUp);
    this.view.addEventListener('wheel', this.onWheel, { passive: false });
  }

  private onDown = (e: PIXI.FederatedPointerEvent) => {
    this.dragging = true;
    this.lastX = e.global.x;
    this.events.onDragStart();
  };

  private onMove = (e: PIXI.FederatedPointerEvent) => {
    if (!this.dragging) {
      return;
    }

    const delta = e.global.x - this.lastX;

    this.lastX = e.global.x;

    this.events.onDragMove(delta);
  };

  private onUp = () => {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.events.onDragEnd();
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    this.events.onWheel(-raw);
  };

  destroy() {
    this.stage.off('pointerdown', this.onDown);
    this.stage.off('pointermove', this.onMove);

    window.removeEventListener('pointerup', this.onUp);
    this.view.removeEventListener('wheel', this.onWheel);
  }
}
