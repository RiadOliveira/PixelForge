import { useEffect, useRef } from 'react';
import { drawImageOnCanvas } from 'utils/auxiliar/drawImageOnCanvas';

interface CanvasProps {
  element: HTMLCanvasElement;
}

export const Canvas = ({ element }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current } = canvasRef;
    if (!current) return;

    drawImageOnCanvas(current, element);
  }, [element]);

  return <canvas ref={canvasRef} />;
};
