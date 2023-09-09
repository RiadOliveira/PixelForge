import { InputHTMLAttributes } from 'react';
import { Container } from './styles';

export const OperationsInput = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container
      type="number"
      placeholder="Insira o valor"
      onWheel={event => event.currentTarget.blur()}
      {...props}
    />
  );
};
