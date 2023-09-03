import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { Container, OperationsContainer } from './styles';

interface OperationsRootProps extends DefaultComponentProps {
  title: string;
}

export const OperationsRoot = ({ title, children }: OperationsRootProps) => {
  return (
    <Container>
      <h4>{title}</h4>
      <OperationsContainer>{children}</OperationsContainer>
    </Container>
  );
};
