import { DefaultComponentProps } from 'types/DefaultComponentProps';
import { Container } from './styles';

interface OperationsRootProps extends DefaultComponentProps {
  title: string;
}

export const OperationsRoot = ({ title, children }: OperationsRootProps) => {
  return (
    <Container>
      <h4>{title}</h4>
      {children}
    </Container>
  );
};
