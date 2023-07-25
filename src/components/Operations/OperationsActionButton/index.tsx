import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type OperationsActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const OperationsActionButton = (props: OperationsActionButtonProps) => {
  return <Container {...props} />;
};
