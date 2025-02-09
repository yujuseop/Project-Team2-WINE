import React, { useState } from "react";

const Profile: React.FC = () => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  // 실제 API 주소 사용
  const API_URL = "https://your-real-api.com"; // 여기에 실제 API 주소 입력

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      return null;
    }
  };

  const handleImageChange1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = await uploadImage(file);
      if (imageUrl) setImage1(imageUrl);
    }
  };

  const handleImageChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = await uploadImage(file);
      if (imageUrl) setImage2(imageUrl);
    }
  };

  return (
    <div style={styles.container}>
      <h2>프로필</h2>

      {/* 첫 번째 프로필 이미지 */}
      <div
        style={{
          ...styles.profileImageContainer,
          background: "#F2F4F8",
          border: "1px solid #CFDBEA",
        }}
        onClick={() => document.getElementById("file-input-1")?.click()}
      >
        <img
          src={image1 || "/default-profile.svg"}
          alt="Profile 1"
          style={styles.profileImage}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        id="file-input-1"
        style={{ display: "none" }}
        onChange={handleImageChange1}
      />

      {/* 두 번째 프로필 이미지 */}
      <div
        style={{
          ...styles.profileImageContainer,
          background: "#6A42DB",
        }}
        onClick={() => document.getElementById("file-input-2")?.click()}
      >
        <img
          src={image2 || "/default-profile2.svg"}
          alt="Profile 2"
          style={styles.profileImage}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        id="file-input-2"
        style={{ display: "none" }}
        onChange={handleImageChange2}
      />
    </div>
  );
};

// 인라인 스타일
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  profileImageContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "10px auto",
    cursor: "pointer",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Profile;
