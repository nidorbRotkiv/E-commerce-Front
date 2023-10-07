import styled, { css } from "styled-components";
import { primary, white } from "@/lib/colors";
import { smallBorderRadius } from "@/lib/constants";

export const ButtonStyle = css`
  background-color: transparent;
  color: black;
  border: none;
  padding: 5px 15px;
  border-radius: ${smallBorderRadius}px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  svg {
    height: 16px;
  }

  ${({ $block }) =>
    $block &&
    css`
      display: block;
      width: 100%;
    `}

  ${({ $white, $outline }) =>
    $white &&
    !$outline &&
    css`
      color: #333;
      background-color: ${white};
      border: 1px solid transparent;
      &:hover {
        background-color: transparent;
        color: ${white};
        border: 1px solid ${white};
      }
    `}
    
    ${({ $white, $outline }) =>
    $white &&
    $outline &&
    css`
      background-color: transparent;
      color: ${white};
      border: 1px solid ${white};
      &:hover {
        background-color: ${white};
        color: #333;
        border: 1px solid ${white};
      }
    `}

  ${({ $primary, $outline }) =>
    $primary &&
    !$outline &&
    css`
      background-color: ${primary};
      color: ${white};
      border: 1px solid ${primary};
      &:hover {
        box-shadow: 0 0 10px 0 ${primary};
      }
    `}

    ${({ $primary, $outline }) =>
    $primary &&
    $outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
      box-shadow: 0 0 2px 0 ${primary};
      &:hover {
        background-color: ${primary};
        color: ${white};
      }
    `}
    
  ${({ size }) =>
    size === "l" &&
    css`
      padding: 10px 20px;
      font-size: 1.2rem;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
