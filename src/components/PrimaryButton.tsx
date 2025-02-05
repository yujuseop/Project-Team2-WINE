import React from "react";
import styles from "./PrimaryButton.module.css";
import classNames from "classnames";

type ButtonProps = {
  size?: "small" | "regular";
  disabled?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<ButtonProps> = ({
  size = "regular",
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.primaryButton, styles[size], {
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
