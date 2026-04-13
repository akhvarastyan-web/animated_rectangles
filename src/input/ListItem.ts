import * as PIXI from 'pixi.js';

export class ListItem extends PIXI.Container {
  private background: PIXI.Graphics;

  private text: PIXI.Text;

  private index: number;

  constructor(index: number, width: number, height: number) {
    super();
    this.index = index;

    this.background = new PIXI.Graphics();
    this.addChild(this.background);

    this.text = new PIXI.Text({
      text: `${index + 1}`,
      style: {
        fill: 0xffffff,
        fontSize: 32,
        fontWeight: 'bold',
        stroke: { color: 0x000000, width: 2 },
      },
    });
    this.addChild(this.text);

    this.draw(width, height);
  }

  private draw(width: number, height: number) {
    this.background.clear();

    const color = this.index % 2 === 0 ? 0x0057b7 : 0xffd700;

    this.background
      .roundRect(0, 0, width, height, 15)
      .fill(color)
      .stroke({ width: 2, color: 0xffffff, alpha: 0.8 });

    this.text.x = width / 2 - this.text.width / 2;
    this.text.y = 20;
  }
}
