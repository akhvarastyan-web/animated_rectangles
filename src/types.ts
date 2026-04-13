export interface InputEvents {
  onDragStart(): void;
  onDragMove(delta: number): void;
  onDragEnd(): void;
  onWheel(delta: number): void;
}
