import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "@/libs/axios";
import ProfileUpdateModal from "./ProfileUpdateModal";

const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<{
    nickname: string;
    email: string;
    image: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg5MDc2MzgsImV4cCI6MTczODkwOTQzOCwiaXNzIjoic3AtZXBpZ3JhbSJ9.bVAyj7RXPhaUUUvCj82iS4cIoq4sfxdO95f-cc9GjQc`,
          },
        });

        const data = response.data;
        setUser({
          nickname: data.nickname || "이름 없음",
          email: data.email || "이메일 없음",
          image: data.image || "/assets/icon/defaultProfile.png",
        });
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 업데이트 후 사용자 정보를 반영하는 함수
  const handleProfileUpdate = (updatedUser: {
    nickname: string;
    image: string;
  }) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedUser } : null));
    setIsModalOpen(false); // 모달 닫기
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_info}>
        <img
          src={user?.image}
          alt="프로필 사진"
          className={styles.profile_image}
        />

        <div className={styles.profile_text}>
          <h2 className={styles.profile_name}>{user?.nickname}</h2>
          <p className={styles.profile_email}>{user?.email}</p>
        </div>
      </div>

      <PrimaryButton
        className={styles.change_button}
        onClick={() => setIsModalOpen(true)}
      >
        변경하기
      </PrimaryButton>

      {/* 변경 모달 */}
      {isModalOpen && user && (
        <ProfileUpdateModal
          user={user}
          onUpdate={handleProfileUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileCard;
