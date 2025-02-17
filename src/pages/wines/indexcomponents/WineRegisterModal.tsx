import React, { useState } from "react";
import styles from "./WineRegisterModal.module.css";
import axios from "@/libs/axios";  // API 등록 시 필요
import Cookies from "js-cookie";   // 토큰 필요 시

export interface WineData {
  name: string;   // 와인 이름
  region: string; // 원산지
  image: string;  // 사용자가 입력한 이미지 URL
  price: number;
  type: string;   // "RED" | "WHITE" | "SPARKLING"
}

interface WineRegisterModalProps {
  onClose: () => void;
  onSubmit: (wineData: WineData) => void;
}

const WineRegisterModal: React.FC<WineRegisterModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [wineName, setWineName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState<"RED" | "WHITE" | "SPARKLING">("RED");
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setPrice(numericValue);
  };

  const handleRegister = async () => {
    if (!wineName.trim() || !price.trim() || !origin.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!imageUrl.trim()) {
      alert("이미지 URL을 입력해주세요!");
      return;
    }

    const wineData: WineData = {
      name: wineName,
      region: origin,
      price: parseFloat(price),
      type,
      image: imageUrl,
    };

    console.log("🚀 등록할 와인 데이터:", wineData);

    try {
      const token = Cookies.get("accessToken");
      await axios.post("/wines", wineData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      onSubmit(wineData);
      onClose();
    } catch (error) {
      console.error("와인 등록 중 오류 발생:", error);
      alert("와인 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>와인 등록</h2>
        </div>

        <div className={styles.modal_body_scrollable}>
          <label className={styles.label}>와인 이름</label>
          <input
            className={styles.input}
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
            placeholder="와인 이름 입력"
          />

          <label className={styles.label}>가격</label>
          <input
            className={styles.input}
            value={price}
            onChange={handlePriceChange}
            type="text"
            placeholder="숫자만 입력"
          />

          <label className={styles.label}>원산지</label>
          <input
            className={styles.input}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="원산지 입력"
          />

          <label className={styles.label}>타입</label>
          <select
            className={styles.select}
            value={type}
            onChange={(e) =>
              setType(e.target.value as "RED" | "WHITE" | "SPARKLING")
            }
          >
            <option value="RED">Red</option>
            <option value="WHITE">White</option>
            <option value="SPARKLING">Sparkling</option>
          </select>

          <label className={styles.label}>별점 (테스트용)</label>
          <div className={styles.rating_container}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${
                  rating >= star ? styles.star_selected : ""
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <label className={styles.label}>이미지 URL</label>
          <input
            className={styles.input}
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="이미지 URL (예: https://...)"
          />
        </div>

        {/* ✅ 버튼 컨테이너 추가 */}
        <div className={styles.button_container}>
          <button className={styles.cancel_button} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.register_button}
            onClick={handleRegister}
            disabled={!wineName || !price || !origin}
          >
            와인 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineRegisterModal;
