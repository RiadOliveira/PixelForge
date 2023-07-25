import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { Container } from './styles';
import { useCallback, useRef } from 'react';
import { useImages } from 'hooks/images';
import { OperationKey } from 'types/operationsNames';
import { OperationsActionButton } from '../OperationsActionButton';
import { extractValuesFromInputsChildren } from 'utils/extractValuesFromInputsChildren';

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

  const handleOnContainerClick = useCallback(() => {
    const { current } = containerRef;
    if (!current) return;

    const inputElements = current.getElementsByTagName('input');
    inputElements.item(0)?.focus();
  }, []);

  const handleOnButtonClick = useCallback(() => {
    const { current } = containerRef;
    if (!current) return;

    const inputsValues = extractValuesFromInputsChildren(current);
    updateImagesWithOperationOnSelectedImages([
      { key: operationKey, values: inputsValues },
    ]);
  }, [operationKey, updateImagesWithOperationOnSelectedImages]);

  return (
    <Container tabIndex={0} ref={containerRef} onClick={handleOnContainerClick}>
      <span>{title}</span>
      {children}

      {selectedImages.length > 0 && (
        <OperationsActionButton type="button" onClick={handleOnButtonClick}>
          Aplicar operação
        </OperationsActionButton>
      )}
    </Container>
  );
};
