import React, { useState } from "react";
import styles from "./ProfileUpdateModal.module.css";
import PrimaryButton from "@/components/PrimaryButton";
import Input from "@/components/Input";
import axios from "@/libs/axios";

interface ProfileUpdateModalProps {
  user: { nickname: string; image: string };
  onUpdate: (updatedUser: { nickname: string; image: string }) => void;
  onClose: () => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  user,
  onUpdate,
  onClose,
}) => {
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newImageUrl, setNewImageUrl] = useState(user.image);
  const [isUpdating, setIsUpdating] = useState(false);

  // 닉네임 입력 핸들러
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  // 이미지 URL 입력 핸들러
  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(event.target.value);
  };

  // 업데이트 API 요청
  const handleUpdate = async () => {
    setIsUpdating(true);

    const updatedData = {
      nickname: newNickname || user.nickname,
      image: newImageUrl || user.image,
    };

    try {
      await axios.patch("/users/me", updatedData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg5MDc2MzgsImV4cCI6MTczODkwOTQzOCwiaXNzIjoic3AtZXBpZ3JhbSJ9.bVAyj7RXPhaUUUvCj82iS4cIoq4sfxdO95f-cc9GjQc`,
          "Content-Type": "application/json",
        },
      });

      onUpdate(updatedData);
    } catch (error) {
      console.error("업데이트 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <p className={styles.title}>프로필 수정하기</p>

        {/* 미리보기 섹션 */}
        <div className={styles.preview_section}>
          <img
            src={newImageUrl || user.image}
            alt="프로필 미리보기"
            className={styles.profile_preview}
          />
          <p className={styles.preview_name}>{newNickname || user.nickname}</p>
        </div>

        <div className={styles.change_wrapper}>
          {/* 닉네임 변경 */}
          <label htmlFor="nickname" className={styles.change_label}>
            닉네임
          </label>
          <Input
            type="text"
            id="nickname"
            className={styles.change_input}
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder="새 닉네임 입력"
          />

          {/* 이미지 URL 입력 */}
          <label htmlFor="imageUrl" className={styles.change_label}>
            프로필 이미지 URL
          </label>
          <Input
            type="text"
            id="imageUrl"
            className={styles.change_input}
            value={newImageUrl}
            onChange={handleImageUrlChange}
            placeholder="이미지 URL 입력"
          />
        </div>

        <div className={styles.button_wrapper}>
          {/* 버튼 */}
          <PrimaryButton
            className={styles.change_button}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "변경 중..." : "변경하기"}
          </PrimaryButton>
          <PrimaryButton className={styles.change_button} onClick={onClose}>
            취소하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
