interface ExtremityPoints {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

export interface ImageDataToHandleOperations {
  data: Uint8ClampedArray;
  extremityPoints: ExtremityPoints;
}
