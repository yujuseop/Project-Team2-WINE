import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

interface TwoButtonProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function TwoButton({ onCancel, onConfirm }: TwoButtonProps) {
  return (
    <div>
      <p>정말 삭제하시겠습니까?</p>
      <SecondaryButton onClick={onCancel}>취소하기</SecondaryButton>
      <PrimaryButton onClick={onConfirm}>삭제하기</PrimaryButton>
    </div>
  );
}
