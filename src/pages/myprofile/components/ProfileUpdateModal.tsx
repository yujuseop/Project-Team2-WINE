import React, { useState, useEffect } from "react";
import styles from "./ProfileUpdateModal.module.css";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Input from "@/components/Input";
import axios from "@/libs/axios";
import Image from "next/image";

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
  const [newNickname, setNewNickname] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

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
      nickname: newNickname,
      image: newImageUrl,
    };

    try {
      await axios.patch("/users/me", updatedData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg5MTYyODYsImV4cCI6MTczODkxODA4NiwiaXNzIjoic3AtZXBpZ3JhbSJ9.d2EOTKxZKsapUfSioriHwNnodiPT6U946wU5uJoBl3c`,
          "Content-Type": "application/json",
        },
      });

      onUpdate(updatedData);
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("업데이트에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 사용자 데이터가 변경될 때마다 newNickname과 newImageUrl을 업데이트
  useEffect(() => {
    if (user.nickname && user.image) {
      setNewNickname(user.nickname);
      setNewImageUrl(user.image);
      setIsLoading(false); // 데이터 로딩 완료
    } else {
      setIsLoading(true); // 데이터 없을 경우 로딩 상태
    }
  }, [user]); // user 값이 변경될 때마다 실행

  if (isLoading) {
    return (
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <p>로딩 중...</p>
        </div>
      </div>
    ); // 데이터가 없을 때 로딩 상태 표시
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <p className={styles.title}>프로필 수정하기</p>

        {/* 미리보기 섹션 */}
        <div className={styles.preview_section}>
          <div className={styles.profile_preview}>
            <Image
              src={newImageUrl || user.image}
              alt="프로필 미리보기"
              fill
              className={styles.profile_img}
              priority
            />
          </div>
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
          <SecondaryButton className={styles.change_button} onClick={onClose}>
            취소하기
          </SecondaryButton>
          <PrimaryButton
            className={styles.change_button}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "변경 중..." : "변경하기"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
