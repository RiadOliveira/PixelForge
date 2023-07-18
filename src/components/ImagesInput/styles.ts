import { firstSelectionBorder } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.button`
  width: 180px;
  height: 180px;
  position: relative;

  border-radius: 4px;
  box-shadow: 0 0 2px 1px ${firstSelectionBorder};
  color: #165e82;
  background-color: rgba(255, 255, 255, 0.6);

  input[type='file'] {
    display: none;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px 1px ${firstSelectionBorder};
    border-radius: 4px;

    opacity: 0;
    transition: 0.3s;
  }

  &:hover:after {
    opacity: 1;
  }
`;
