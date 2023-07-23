import { borderColor } from 'constants/colors';
import styled from 'styled-components';

export const Container = styled.div`
  min-width: 196px;
  height: calc(100vh - 64px);
  position: sticky;
  top: 20px;
  left: 0;

  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 0 2px 2px ${borderColor};
  background-color: rgba(255, 255, 255, 0.6);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 12px;

  h3 {
    font-weight: 500;
    font-size: 18px;
  }
`;

export const OperationsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
