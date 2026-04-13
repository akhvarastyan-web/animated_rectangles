export class ScrollBounds {
  constructor(
    private getScreenWidth: () => number,
    private getListWidth: () => number,
  ) {}

  clamp(x: number) {
    const screen = this.getScreenWidth();
    const list = this.getListWidth();

    if (list <= screen) {
      return {
        x: (screen - list) / 2,
        hit: true,
      };
    }

    const min = screen - list;
    const max = 0;

    if (x < min) {
      return { x: min, hit: true };
    }

    if (x > max) {
      return { x: max, hit: true };
    }

    return { x, hit: false };
  }
}
