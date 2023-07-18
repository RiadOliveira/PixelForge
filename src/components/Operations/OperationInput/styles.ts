import styled from 'styled-components';

export const Container = styled.input`
  width: calc(100% - 16px);
  height: 32px;
  font-size: 12px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
