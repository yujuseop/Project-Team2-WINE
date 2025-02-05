import styled from "styled-components";

type ButtonProps = {
  size?: "small" | "regular";
};

const CancelButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  padding: 16px 0;
  width: 100%;
  color: var(--gray-500);
  font-size: ${({ size }) => (size === "small" ? "14px" : "16px")};
  font-weight: 400;
  line-height: ${({ size }) => (size === "small" ? "24px" : "26px")};
  border-radius: 12px;
  border: 1px solid var(--gary-300);
  box-sizing: border-box;
  background-color: var(--white);
  cursor: pointer;
  transition: all 0.1s ease;

  &:disabled {
    background-color: var(--gray-500);
    color: var(--black);
  }
`;

export default CancelButton;
