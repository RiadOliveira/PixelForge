import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import { drawImageOnCanvas } from 'utils/auxiliar/drawImageOnCanvas';
import { Container } from './styles';
import { SELECTION_COLORS } from 'constants/colors';

interface CanvasImageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element: HTMLCanvasElement;
  selectionPosition: number;
  someImageSelected: boolean;
  toggleSelectImage: (selected: boolean) => void;
}

export const CanvasImage = ({
  element,
  selectionPosition,
  toggleSelectImage,
  someImageSelected,
  ...props
}: CanvasImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selected = selectionPosition !== -1;

  const { borderColor, textColor, portugueseText } =
    SELECTION_COLORS[
      !someImageSelected || selectionPosition === 0 ? 'first' : 'second'
    ];

  useEffect(() => {
    const { current } = canvasRef;
    if (!current) return;

    drawImageOnCanvas(current, element);
  }, [element]);

  return (
    <Container
      type="button"
      selected={selected}
      onClick={() => toggleSelectImage(selected)}
      borderColor={borderColor}
      textColor={textColor}
      style={{
        width: element.width,
        height: element.height + (selected ? 30 : 0),
      }}
      {...props}
    >
      <canvas ref={canvasRef} />
      {selected && <span>{portugueseText} selecionada</span>}
    </Container>
  );
};
