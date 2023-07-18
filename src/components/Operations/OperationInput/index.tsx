import { InputHTMLAttributes } from 'react';
import { Container } from './styles';

export const OperationInput = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container
      type="number"
      placeholder="Insira o valor"
      maxLength={10}
      {...props}
    />
  );
};
