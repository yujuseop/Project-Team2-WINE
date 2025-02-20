import React from "react";
import { FaFilter } from "react-icons/fa";
import styles from "./WineFilterToggleButton.module.css";

interface Props {
  onClick: () => void;
}

const WineFilterToggleButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      className={styles.filter_toggle_button}
      onClick={onClick}
      aria-label="와인 필터 열기"
    >
      <FaFilter />
    </button>
  );
};

export default WineFilterToggleButton;
