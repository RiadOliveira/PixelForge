import styled from 'styled-components';
import { backgroundColor } from 'constants/colors';

export const Container = styled.div`
  padding: 20px 20px 20px 0;
  background-color: ${backgroundColor};
  min-width: calc(100% - 40px);
  min-height: calc(100% - 40px);

  display: flex;
  gap: 48px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
`;
