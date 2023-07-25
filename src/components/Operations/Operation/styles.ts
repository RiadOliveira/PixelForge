import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-height: 32px;
  overflow: hidden;
  cursor: pointer;

  border: 1px solid ${borderColor};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  transition: 0.2s;
  gap: 8px;

  *:not(button) {
    padding-inline: 8px;
  }

  span {
    line-height: 32px;
    height: 32px;
    font-size: 14px;

    border-bottom: 1px solid transparent;
    transition: 0.3s;
  }

  &:hover,
  &:focus-within {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:not(:focus-within) {
    box-shadow: 1px 1px 0 0 ${borderColor};
  }

  &:focus-within {
    max-height: 117px;

    span {
      border-color: ${borderColor};
    }
  }
`;
