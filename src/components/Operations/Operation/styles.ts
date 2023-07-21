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

export const ApplyButton = styled.button`
  width: 100%;
  padding: 8px;
  border-top: 1px solid ${borderColor};
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffffff;

  border-top: 1px solid ${borderColor};
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  transition: 0.3s;

  span + & {
    margin-top: -9px;
  }

  &:hover {
    background-color: #282828;
  }
`;
