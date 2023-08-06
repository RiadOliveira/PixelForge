import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.select`
  width: calc(100% + 2px);
  height: 32px;
  font-size: 14px;

  border: 1px solid ${borderColor};
  box-shadow: 1px 1px 0 0 ${borderColor};

  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
