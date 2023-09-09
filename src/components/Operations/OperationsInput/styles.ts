import styled from 'styled-components';

export const Container = styled.input`
  width: calc(100% - 16px);
  min-height: 30px;
  max-height: 30px;
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

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6 !important;
  }
`;
