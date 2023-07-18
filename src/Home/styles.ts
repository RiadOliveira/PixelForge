import styled from 'styled-components';
import { backgroundColor } from 'constants/colors';

export const Container = styled.div`
  padding: 20px;
  background-color: ${backgroundColor};
  min-width: calc(100% - 40px);
  min-height: calc(100% - 40px);

  display: flex;
  flex-wrap: wrap;
  gap: 28px;
`;
