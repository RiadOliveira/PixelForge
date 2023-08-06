import { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => {
  return <Container {...props} />;
};
