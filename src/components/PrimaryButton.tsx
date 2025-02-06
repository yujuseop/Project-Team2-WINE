import React from "react";
import styles from "./PrimaryButton.module.css";
import classNames from "classnames";

type ButtonProps = {
  size?: "small" | "regular";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string; // className을 추가적으로 받을 수 있도록 설정
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<ButtonProps> = ({
  size = "regular",
  disabled,
  children,
  className, // 추가된 className
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.primaryButton,
        styles[size],
        className && className,
        {
          [styles.disabled]: disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
