import { Operations } from 'components/Operations';
import { Container, OperationsContainer } from './styles';
import { OperationInput } from 'components/Operations/OperationInput';
import { useImages } from 'hooks/images';
import { Checkbox } from 'components/Checkbox';
import {
  ARITHMETICS_OPERATIONS,
  ArithmeticOperationKey,
} from 'types/operations/arithmetics';
import { LOGICS_OPERATIONS, LogicOperationKey } from 'types/operations/logics';

export const OperationPanel = () => {
  const { selectedImages, normalizeValues, setNormalizeValues } = useImages();
  const oneImageSelected = selectedImages.length === 1;

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <Checkbox
        label="Normalizar valores"
        checked={normalizeValues}
        handleChange={setNormalizeValues}
      />

      <OperationsContainer>
        <Operations.Root title="Aritméticas">
          {Object.entries(ARITHMETICS_OPERATIONS).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as ArithmeticOperationKey}
            >
              {oneImageSelected && <OperationInput />}
            </Operations.Operation>
          ))}
        </Operations.Root>

        <Operations.Root title="Lógicas">
          {Object.entries(LOGICS_OPERATIONS).map(([key, value]) => (
            <Operations.Operation
              key={key}
              title={value}
              operationKey={key as LogicOperationKey}
            >
              {oneImageSelected && <OperationInput />}
            </Operations.Operation>
          ))}
        </Operations.Root>
      </OperationsContainer>
    </Container>
  );
};
