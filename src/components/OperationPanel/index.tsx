import { Operations } from 'components/Operations';
import { Container, OperationsContainer } from './styles';
import { OperationInput } from 'components/Operations/OperationInput';
import { useImages } from 'hooks/images';
import {
  addition,
  division,
  multiplication,
  subtraction,
} from 'operations/arithmetic';

export const OperationPanel = () => {
  const { selectedImages } = useImages();
  const oneImageSelected = selectedImages.length === 1;

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <OperationsContainer>
        <Operations.Root title="Aritméticas">
          <Operations.Operation title="Adição" operationFunction={addition}>
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation
            title="Subtração"
            operationFunction={subtraction}
          >
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation
            title="Multiplicação"
            operationFunction={multiplication}
          >
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation title="Divisão" operationFunction={division}>
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>
        </Operations.Root>
      </OperationsContainer>
    </Container>
  );
};
