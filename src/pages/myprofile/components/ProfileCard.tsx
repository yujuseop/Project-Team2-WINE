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
  const [newNickname, setNewNickname] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(""); // ✅ 이미지 URL 입력값 추가

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg4NTc1NTksImV4cCI6MTczODg1OTM1OSwiaXNzIjoic3AtZXBpZ3JhbSJ9.PQcXj2BFa0qi7scOli5wQHv_BsvG5UrKzcdAqjlp3yg`,
          },
        });

        const data = response.data;
        setUser({
          nickname: data.nickname || "이름 없음",
          email: data.email || "이메일 없음",
          image: data.image || "/assets/icon/defaultProfile.png",
        });

        // 닉네임 초기값 설정
        setNewNickname(data.nickname || "");
        setNewImageUrl(data.image || ""); // ✅ 이미지 URL 초기값 설정
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
    if (!user) return;

    const updatedData = {
      nickname: newNickname || user.nickname,
      image: newImageUrl || user.image, // ✅ 변경된 이미지 URL 사용
    };

    try {
      await axios.patch("/users/me", updatedData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQ4LCJ0ZWFtSWQiOiIxMi0yIiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3Mzg4NTc1NTksImV4cCI6MTczODg1OTM1OSwiaXNzIjoic3AtZXBpZ3JhbSJ9.PQcXj2BFa0qi7scOli5wQHv_BsvG5UrKzcdAqjlp3yg`,
          "Content-Type": "application/json",
        },
      });

      // UI 업데이트 (변경된 내용 반영)
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              nickname: updatedData.nickname,
              image: updatedData.image,
            }
          : null
      );

      // 입력값 초기화
      setNewNickname("");
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_info}>
        {/* 이미지 미리보기 */}
        <img
          src={newImageUrl || user?.image}
          alt="프로필 사진"
          className={styles.profile_image}
        />

        <div className={styles.profile_text}>
          <h2 className={styles.profile_name}>{user?.nickname}</h2>
          <p className={styles.profile_email}>{user?.email}</p>
        </div>
      </div>

      <div className={styles.profile_details}>
        {/* 닉네임 변경 */}
        <label htmlFor="nickname" className={styles.nickname_label}>
          닉네임
        </label>
        <Input
          type="text"
          id="nickname"
          className={styles.nickname_input}
          value={newNickname}
          onChange={handleNicknameChange}
          placeholder={user?.nickname}
        />

        {/* 이미지 URL 입력 */}
        <label htmlFor="imageUrl" className={styles.image_label}>
          프로필 이미지 URL
        </label>
        <Input
          type="text"
          id="imageUrl"
          className={styles.image_input}
          value={newImageUrl}
          onChange={handleImageUrlChange}
          placeholder="이미지 URL을 입력하세요"
        />

        {/* 변경 버튼 */}
        <PrimaryButton className={styles.change_button} onClick={handleUpdate}>
          변경하기
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProfileCard;
