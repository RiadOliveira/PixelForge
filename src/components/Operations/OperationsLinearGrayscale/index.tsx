import { ButtonsContainer, Container, InputsContainer } from './styles';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OperationsInput } from '../OperationsInput';
import { OperationData } from 'types/operations/OperationData';
import { OperationsActionButton } from '../OperationsActionButton';
import { firstSelectionText, secondSelectionText } from 'constants/colors';
import { extractValuesFromInputsChildren } from 'utils/extractValuesFromInputsChildren';
import { useImages } from 'hooks/images';
import { Select } from 'components/Select';
import {
  LINEAR_GRAYSCALE_OPERATIONS,
  LinearGrayscaleOperationKey,
} from 'types/operationsNames/linearGrayScale';
import { normalizeValue } from 'utils/auxiliar/normalizeValue';

export const OperationsLinearGrayscale = () => {
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const { selectedImages, updateImagesWithOperationOnSelectedImages } =
    useImages();

  const [operationIntervals, setOperationIntervals] = useState<number[][]>([]);
  const [selectedOperation, setSelectedOperation] =
    useState<LinearGrayscaleOperationKey>('NEW_INTERVAL');

  useEffect(() => {
    setOperationIntervals([]);
  }, [selectedOperation]);

  const inputsDisabled = useMemo(
    () => selectedOperation === 'NEW_INTERVAL' && operationIntervals.length > 0,
    [operationIntervals.length, selectedOperation],
  );

  const intervalsAdded = useMemo(
    () => operationIntervals.map(values => `[${values.join(';')}]`).join(' | '),
    [operationIntervals],
  );

  const handleAddOperation = useCallback(() => {
    const { current } = inputsContainerRef;
    if (!current) return;

    const [min, max] = extractValuesFromInputsChildren(current);
    setOperationIntervals(previousIntervals => {
      const parsedMin = normalizeValue(min);
      const parsedMax = normalizeValue(max);
      const parsedInterval =
        parsedMin < parsedMax ? [parsedMin, parsedMax] : [parsedMax, parsedMin];

      return [...previousIntervals, parsedInterval];
    });
  }, []);

  const handleOnApplyButtonClick = useCallback(() => {
    const operationsData = [] as OperationData[];

    if (selectedOperation === 'BY_PARTS') {
      const parsedOperationsData = operationIntervals.map(interval => ({
        key: selectedOperation,
        values: interval,
      }));
      operationsData.push(...parsedOperationsData);
    } else {
      operationsData.push({
        key: selectedOperation,
        values: operationIntervals[0],
      });
    }

    updateImagesWithOperationOnSelectedImages(operationsData);
    setOperationIntervals([]);
  }, [
    operationIntervals,
    selectedOperation,
    updateImagesWithOperationOnSelectedImages,
  ]);

  return (
    <Container>
      <OperationsInput
        placeholder="Intervalos adicionados"
        type="text"
        value={intervalsAdded}
        readOnly
      />

      <Select
        onChange={({ target: { value } }) =>
          setSelectedOperation(value as LinearGrayscaleOperationKey)
        }
      >
        {Object.entries(LINEAR_GRAYSCALE_OPERATIONS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>

      <InputsContainer ref={inputsContainerRef}>
        <OperationsInput
          placeholder="Mínimo do intervalo"
          disabled={inputsDisabled}
        />
        <OperationsInput
          placeholder="Máximo do intervalo"
          disabled={inputsDisabled}
        />
      </InputsContainer>

      <ButtonsContainer>
        <OperationsActionButton
          type="button"
          style={{ background: firstSelectionText }}
          onClick={handleAddOperation}
          disabled={inputsDisabled}
        >
          Adicionar
        </OperationsActionButton>

        <OperationsActionButton
          type="button"
          style={{ background: secondSelectionText }}
          onClick={() => setOperationIntervals([])}
        >
          Resetar
        </OperationsActionButton>
      </ButtonsContainer>

      <OperationsActionButton
        type="button"
        disabled={
          selectedImages.length === 0 || operationIntervals.length === 0
        }
        onClick={handleOnApplyButtonClick}
      >
        Aplicar operação
      </OperationsActionButton>
    </Container>
  );
};
