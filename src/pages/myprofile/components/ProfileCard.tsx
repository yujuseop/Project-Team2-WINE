import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";
import PrimaryButton from "@/components/PrimaryButton";
import Input from "@/components/Input";
import axios from "@/libs/axios";

const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<{
    nickname: string;
    email: string;
    image: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg4NDc4NTEsImV4cCI6MTczODg0OTY1MSwiaXNzIjoic3AtZXBpZ3JhbSJ9.6CVfJQ60CuTAIJSOe061N7gv1o5y-Roh_iNi0YIF4_w`, // 임시 토큰 사용
          },
        });

        // axios는 데이터를 response.data로 반환
        const data = response.data;

        setUser({
          nickname: data.nickname || "이름 없음",
          email: data.email || "이메일 없음",
          image: data.image || "/assets/icon/defaultProfile.png", // 기본 이미지 설정
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

      <div className={styles.profile_details}>
        <label htmlFor="nickname" className={styles.nickname_label}>
          닉네임
        </label>
        <div className={styles.change_section}>
          <Input
            type="text"
            id="nickname"
            className={styles.nickname_input}
            placeholder={user?.nickname}
          />
          <div>
            <PrimaryButton className={styles.change_button}>
              변경하기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
