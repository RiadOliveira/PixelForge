import { Checkmark, Container } from './styles';

interface CheckboxProps {
  label: string;
  checked: boolean;
  handleChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, handleChange }: CheckboxProps) => {
  return (
    <Container>
      {label}
      <input
        type="checkbox"
        onChange={({ target: { checked } }) => handleChange(checked)}
        checked={checked}
      />
      <Checkmark />
    </Container>
  );
};
