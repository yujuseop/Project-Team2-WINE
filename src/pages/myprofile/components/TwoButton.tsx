import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./TwoButton.module.css";

interface TwoButtonProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function TwoButton({ onCancel, onConfirm }: TwoButtonProps) {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <p className={styles.question}>정말 삭제하시겠습니까?</p>
        <div className={styles.button_wrapper}>
          <SecondaryButton className={styles.button} onClick={onCancel}>
            취소하기
          </SecondaryButton>
          <PrimaryButton className={styles.button} onClick={onConfirm}>
            삭제하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
