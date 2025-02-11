import styles from "./ReviewButton.module.css";

interface ReviewButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function ReviewButton({
  onClick,
  className = "",
  children,
}: ReviewButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
