import { borderColor, textColor } from 'constants/colors';
import styled from 'styled-components';

export const Checkmark = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;
  background-color: ${borderColor};
  border-radius: 2px;

  &,
  &:after {
    transition: 0.2s;
  }

  &:after {
    content: '';
    position: absolute;

    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid ${textColor};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);

    opacity: 0;
    visibility: hidden;
  }
`;

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 28px;

  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &:hover ${Checkmark} {
    background-color: #c7c3c3;
  }

  input:checked ~ ${Checkmark}:after {
    opacity: 1;
    visibility: visible;
  }
`;
