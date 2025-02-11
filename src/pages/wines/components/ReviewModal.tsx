// 임시로 만듦 -> 수정 예정

import { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  width: 528px;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewContent: string) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
  const [reviewContent, setReviewContent] = useState("");

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewContent);
    setReviewContent(""); // 리뷰 제출 후 내용 초기화
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>리뷰 남기기</h3>
        <ModalForm onSubmit={handleSubmit}>
          <Textarea
            value={reviewContent}
            onChange={handleReviewChange}
            placeholder="리뷰를 입력하세요."
            rows={5}
          />
          <div>
            <SubmitButton type="submit">제출</SubmitButton>
            <CloseButton type="button" onClick={onClose}>
              닫기
            </CloseButton>
          </div>
        </ModalForm>
      </ModalContent>
    </ModalBackground>
  );
};

export default ReviewModal;
