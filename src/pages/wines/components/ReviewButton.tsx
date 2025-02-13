import styles from "./ReviewButton.module.css";

interface ReviewButtonProps {
  onClick?: () => void;
  onSubmit?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function ReviewButton({
  onClick,
  onSubmit,
  className = "",
  children,
  type = "button",
}: ReviewButtonProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(); // onSubmit 프롭이 있으면 호출
    }
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      onSubmit={handleSubmit}
      type={type}
    >
      {children}
    </button>
  );
}
