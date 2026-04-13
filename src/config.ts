export const CONFIG = {
  ITEM_COUNT: 150,
  PHYSICS: {
    FRICTION: 0.93,
    WHEEL_SENSITIVITY: 0.7,
    MAX_VELOCITY: 40,
    MIN_VELOCITY: 0.1,
  },
} as const;

export function getResponsiveConfig(width: number) {
  if (width < 600) {
    return {
      ...CONFIG,
      CARD: { WIDTH: 120, HEIGHT: 180 },
      GAP: 10,
      PADDING: 20,
    };
  }

  if (width < 1024) {
    return {
      ...CONFIG,
      CARD: { WIDTH: 160, HEIGHT: 240 },
      GAP: 15,
      PADDING: 30,
    };
  }

  return {
    ...CONFIG,
    CARD: { WIDTH: 200, HEIGHT: 300 },
    GAP: 20,
    PADDING: 50,
  };
}
