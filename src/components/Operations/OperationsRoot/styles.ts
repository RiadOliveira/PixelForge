import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const OperationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 8px;
  padding-bottom: 2px;
  gap: 12px;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.28);
    border-radius: 4px;
  }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-block: 8px;
  padding-left: 4px;

  border-top: 2px solid ${borderColor};
  max-height: 28px;
  transition: 0.5s;
  transition-delay: 0.1s;

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
    transition-delay: 0.1s;
  }

  &:last-child {
    border-bottom: 2px solid ${borderColor};
  }

  &:hover {
    max-height: 260px;
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
