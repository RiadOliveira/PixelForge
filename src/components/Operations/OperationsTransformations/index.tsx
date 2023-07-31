import {
  TRANSFORMATIONS,
  TransformationKey,
} from 'types/operationsNames/transformations';
import {
  ButtonsContainer,
  Container,
  InputsContainer,
  TransformationsSelect,
} from './styles';
import { useCallback, useMemo, useRef, useState } from 'react';
import { OperationsInput } from '../OperationsInput';
import { OperationData } from 'types/operations/OperationData';
import { OperationsActionButton } from '../OperationsActionButton';
import { firstSelectionText, secondSelectionText } from 'constants/colors';
import { extractValuesFromInputsChildren } from 'utils/extractValuesFromInputsChildren';
import { useImages } from 'hooks/images';

const TRANSFORMATIONS_INPUTS_NAMES: { [key in TransformationKey]: string[] } = {
  ROTATION: ['Graus da rotação'],
  TRANSLATION: ['Distância X', 'Distância Y'],
  SCALE: ['Escala X', 'Escala Y'],
  HORIZONTAL_REFLECTION: [],
  VERTICAL_REFLECTION: [],
  X_SHEARING: ['Valor do Cisalhamento'],
  Y_SHEARING: ['Valor do Cisalhamento'],
};

export const OperationsTransformations = () => {
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const { selectedImages, updateImagesWithOperationOnSelectedImages } =
    useImages();

  const [addedTransformations, setAddedTransformations] = useState<
    OperationData[]
  >([]);
  const [selectedTransformation, setSelectedTransformation] =
    useState<TransformationKey>('ROTATION');

  const appliedTransformations = useMemo(
    () =>
      addedTransformations
        .map(
          ({ key, values }) =>
            `${TRANSFORMATIONS[key as TransformationKey]}(${values.join(';')})`,
        )
        .join(' | '),
    [addedTransformations],
  );

  const handleAddTransformation = useCallback(() => {
    const { current } = inputsContainerRef;
    if (!current) return;

    const inputsValues = extractValuesFromInputsChildren(current);
    setAddedTransformations(previousTransformations => [
      ...previousTransformations,
      { key: selectedTransformation, values: inputsValues },
    ]);
  }, [selectedTransformation]);

  const handleOnApplyButtonClick = useCallback(() => {
    updateImagesWithOperationOnSelectedImages(addedTransformations);
    setAddedTransformations([]);
  }, [addedTransformations, updateImagesWithOperationOnSelectedImages]);

  return (
    <Container>
      <OperationsInput
        placeholder="Transformações adicionadas"
        type="text"
        value={appliedTransformations}
        readOnly
      />

      <TransformationsSelect
        onChange={({ target: { value } }) =>
          setSelectedTransformation(value as TransformationKey)
        }
      >
        {Object.entries(TRANSFORMATIONS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </TransformationsSelect>

      <InputsContainer ref={inputsContainerRef}>
        {TRANSFORMATIONS_INPUTS_NAMES[selectedTransformation].map(inputName => (
          <OperationsInput key={inputName} placeholder={inputName} />
        ))}
      </InputsContainer>

      <ButtonsContainer>
        <OperationsActionButton
          type="button"
          style={{ background: firstSelectionText }}
          onClick={handleAddTransformation}
        >
          Adicionar
        </OperationsActionButton>

        <OperationsActionButton
          type="button"
          style={{ background: secondSelectionText }}
          onClick={() => setAddedTransformations([])}
        >
          Resetar
        </OperationsActionButton>
      </ButtonsContainer>

      <OperationsActionButton
        type="button"
        disabled={selectedImages.length === 0}
        onClick={handleOnApplyButtonClick}
      >
        Aplicar operações
      </OperationsActionButton>
    </Container>
  );
};
