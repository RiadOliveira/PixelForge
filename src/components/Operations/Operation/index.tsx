import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { ApplyButton, Container } from './styles';
import { useCallback, useRef } from 'react';
import { useImages } from 'hooks/images';
import { OperationKey } from 'types/operations';

interface OperationProps extends DefaultComponentProps {
  title: string;
  operationKey: OperationKey;
}

export const Operation = ({
  title,
  operationKey,
  children,
}: OperationProps) => {
  const { selectedImages, updateImagesWithOperationOnSelectedImages } =
    useImages();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOnClick = useCallback(() => {
    const { current } = containerRef;
    if (!current) return;

    const inputElements = current.getElementsByTagName('input');
    const inputValues = Array.from(inputElements).map(input => {
      const parsedValue = Number(input.value);
      input.value = '';

      return parsedValue;
    });
    updateImagesWithOperationOnSelectedImages(operationKey, inputValues);
  }, [operationKey, updateImagesWithOperationOnSelectedImages]);

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
