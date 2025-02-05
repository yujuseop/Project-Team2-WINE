import styled from "styled-components";

type ButtonProps = {
  size?: "small" | "regular";
};

const PrimaryButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  padding: 16px 0;
  width: 100%;
  color: var(--white);
  font-size: ${({ size }) => (size === "small" ? "14px" : "16px")};
  font-weight: 500;
  line-height: ${({ size }) => (size === "small" ? "24px" : "26px")};
  border-radius: ${({ size }) => (size === "small" ? "12px" : "16px")};
  box-sizing: border-box;
  background-color: var(--purple-100);
  cursor: pointer;
  transition: all 0.1s ease;

  &:disabled {
    background-color: var(--gray-500);
    color: var(--black);
  }
`;

export default PrimaryButton;
