import { Operations } from 'components/Operations';
import { Container, OperationsContainer } from './styles';
import { OperationInput } from 'components/Operations/OperationInput';
import { useImages } from 'hooks/images';

export const OperationPanel = () => {
  const { selectedImages } = useImages();
  const oneImageSelected = selectedImages.length === 1;

  return (
    <Container>
      <h3>Painel de Operações</h3>

      <OperationsContainer>
        <Operations.Root title="Aritméticas">
          <Operations.Operation title="Adição" operationKey="ADDITION">
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation title="Subtração" operationKey="SUBTRACTION">
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation
            title="Multiplicação"
            operationKey="MULTIPLICATION"
          >
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>

          <Operations.Operation title="Divisão" operationKey="DIVISION">
            {oneImageSelected && <OperationInput />}
          </Operations.Operation>
        </Operations.Root>
      </OperationsContainer>
    </Container>
  );
};
