import styled, { css } from 'styled-components';

interface ContainerProps {
  selected: boolean;
  textColor: string;
  borderColor: string;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  transition: 0.3s;

  canvas {
    z-index: 1;
  }

  span {
    font-size: 14px;
    line-height: 14px;
    padding-block: 8px;
    font-weight: 500;
    color: ${({ textColor }) => textColor};

    position: absolute;
    bottom: 0;
  }

  &:hover {
    box-shadow: 0 0 0 3px ${({ borderColor }) => borderColor};
  }

  ${({ selected, borderColor }) =>
    selected &&
    css`
      box-shadow: 0 0 0 2px ${borderColor};
    `}
`;
