import React, { useState } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  options: string[];
  onChange?: (selected: string) => void;
  className?: string; // className 추가
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleDropdown(): void {
    setIsOpen((prev) => !prev);
  }

  function handleSelectOption(option: string): void {
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  }

  return (
    <div className={`${styles.dropdownContainer} ${className || ""}`}>
      {/* 햄버거 메뉴 버튼 */}
      <button className={styles.hamburgerButton} onClick={toggleDropdown}>
        ⋮
      </button>

      {/* 옵션 리스트 */}
      <ul
        className={`${styles.selectOptionList} ${isOpen ? styles.active : ""}`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.optionItem}
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
