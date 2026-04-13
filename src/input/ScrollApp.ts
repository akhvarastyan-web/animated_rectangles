import * as PIXI from 'pixi.js';
import { ScrollPhysics } from '../physics/ScrollPhysics';
import { ScrollBounds } from '../bounds/ScrollBounds';
import { InputController } from '../input/InputController';
import { ListItem } from './ListItem';
import { getResponsiveConfig, CONFIG } from './../config';

export class ScrollApp {
  private app = new PIXI.Application();

  private container: PIXI.Container = new PIXI.Container();

  private layout = getResponsiveConfig(window.innerWidth);

  private physics = new ScrollPhysics();

  private bounds!: ScrollBounds;

  private input!: InputController;

  private tickerFn = () => {
    const v = this.physics.tick();

    if (v !== 0) {
      this.move(v);
    }
  };

  constructor(private root: HTMLDivElement) {}

  async init() {
    await this.app.init({
      resizeTo: this.root,
      backgroundColor: 0x1a1a1a,
    });

    this.root.appendChild(this.app.canvas);
    this.app.stage.addChild(this.container);

    this.bounds = new ScrollBounds(
      () => this.app.screen.width,
      () => this.container.width,
    );

    this.createItems();
    this.centerY();
    this.initInput();

    this.app.ticker.add(this.tickerFn);

    window.addEventListener('resize', this.onResize);
  }

  private createItems() {
    const { CARD, GAP } = this.layout;

    this.container.removeChildren();

    for (let i = 0; i < CONFIG.ITEM_COUNT; i++) {
      const item = new ListItem(i, CARD.WIDTH, CARD.HEIGHT);

      item.x = i * (CARD.WIDTH + GAP);

      this.container.addChild(item);
    }
  }

  private getCenterItemIndex(): number {
    const screenCenter = this.app.screen.width / 2;
    const relativeCenter = screenCenter - this.container.x;
    const itemWidth = this.layout.CARD.WIDTH + this.layout.GAP;
    const index = Math.round(relativeCenter / itemWidth);

    return Math.max(0, Math.min(CONFIG.ITEM_COUNT - 1, index));
  }

  private scrollToIndex(index: number) {
    const { CARD, GAP } = this.layout;
    const itemWidth = CARD.WIDTH + GAP;
    const targetX = this.app.screen.width / 2 - index * itemWidth;
    const { x } = this.bounds.clamp(targetX);

    this.container.x = x;
  }

  private centerY() {
    const screenHeight = window.innerHeight;

    this.container.y = (screenHeight - this.layout.CARD.HEIGHT) / 2;
  }

  private move(delta: number) {
    const { x, hit } = this.bounds.clamp(this.container.x + delta);

    this.container.x = x;

    if (hit) {
      this.physics.stop();
    }
  }

  private initInput() {
    this.input = new InputController(this.app.canvas, this.app.stage, {
      onDragStart: () => this.physics.startDrag(),
      onDragMove: d => {
        this.move(d);
        this.physics.updateFromDrag(d);
      },
      onDragEnd: () => this.physics.endDrag(),
      onWheel: d => {
        this.physics.applyWheel(d);
      },
    });
  }

  private onResize = () => {
    const currentIndex = this.getCenterItemIndex();

    this.layout = getResponsiveConfig(window.innerWidth);

    this.createItems();

    this.centerY();

    this.scrollToIndex(currentIndex);

    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.screen.width,
      this.app.screen.height,
    );

    this.move(0);
  };

  destroy() {
    this.app.ticker.remove(this.tickerFn);
    window.removeEventListener('resize', this.onResize);

    this.input?.destroy();
    this.app.destroy(true);
  }
}
