import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.button`
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

  &:not(:disabled) {
    &:hover,
    &:focus {
      background-color: #323232;
    }
  }
`;
