import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { ApplyButton, Container } from './styles';
import { useCallback, useRef } from 'react';
import { useImages } from 'hooks/images';
import { OperationFunction } from 'types/OperationFunction';

interface OperationProps extends DefaultComponentProps {
  title: string;
  operationFunction: OperationFunction;
}

export const Operation = ({
  title,
  operationFunction,
  children,
}: OperationProps) => {
  const { selectedImages, updateImagesWithOperationOnSelectedImages } =
    useImages();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOnClick = useCallback(() => {
    const { current } = containerRef;
    if (!current) return;

    const inputElements = current.getElementsByTagName('input');
    const inputValues = Array.from(inputElements).map(({ value }) =>
      Number(value),
    );
    updateImagesWithOperationOnSelectedImages(operationFunction, inputValues);
  }, [operationFunction, updateImagesWithOperationOnSelectedImages]);

  return (
    <Container tabIndex={0} ref={containerRef}>
      <span>{title}</span>

      {children}

      {selectedImages.length > 0 && (
        <ApplyButton type="button" onClick={handleOnClick}>
          Aplicar operação
        </ApplyButton>
      )}
    </Container>
  );
};
