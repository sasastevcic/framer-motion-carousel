import styled, { css } from "styled-components";

export const StyledDots = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

export const StyledDot = styled.button<{ $isActive: boolean }>`
  background-color: #000;
  border: 0;
  padding: 0;
  margin: 0 5px;
  border-radius: 50%;
  height: 20px;
  width: 20px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 0.7;
    `}
`;
