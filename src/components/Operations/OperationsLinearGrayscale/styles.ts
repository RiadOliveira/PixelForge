import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    border-radius: 4px;
    height: 30px;
  }

  input {
    width: calc(100% - 8px);

    border: 1px solid ${borderColor};
    border-radius: 4px;
    transition: 0.2s;
    padding-inline: 4px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 48%;

    &:not(:disabled) {
      &:hover,
      &:focus {
        opacity: 0.83;
      }
    }
  }
`;
