import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";
import SecondaryButton from "@/components/SecondaryButton";
import axios from "@/libs/axios"; //토큰관리
import ProfileUpdateModal from "./ProfileUpdateModal";

const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<{
    nickname: string;
    image: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me"); // 토큰 받아옴
        const data = response.data;
        setUser({
          nickname: data.nickname || "이름 없음",
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
        </div>
      </div>

      <SecondaryButton
        className={styles.change_button}
        onClick={() => setIsModalOpen(true)}
      >
        프로필 수정하기
      </SecondaryButton>

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
