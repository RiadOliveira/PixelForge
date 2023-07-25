import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 4px;
  overflow: hidden;

  border-top: 2px solid ${borderColor};
  max-height: 28px;
  transition: 0.5s;

  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    height: 28px;
  }

  *:not(h4) {
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    transition-delay: 0.2s;
  }

  &:last-child {
    border-bottom: 2px solid ${borderColor};
  }

  &:hover {
    max-height: 315px;
    padding-bottom: 16px;

    *:not(h4) {
      opacity: 1;
      visibility: visible;
    }
  }

  &:not(:hover) {
    transition-delay: 0.3s;
  }
`;
