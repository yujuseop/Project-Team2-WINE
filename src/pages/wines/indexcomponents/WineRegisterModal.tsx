import React, { useState } from "react";
import styles from "./WineRegisterModal.module.css";

// 수정: 와인 데이터 타입 정의
interface WineData {
  wineName: string;
  price: number;
  origin: string;
  type: string;
  rating: number;
}

interface WineRegisterModalProps {
  onClose: () => void;
  onSubmit: (wineData: WineData) => void;  // 수정: any 타입을 WineData로 변경
}

const WineRegisterModal: React.FC<WineRegisterModalProps> = ({ onClose, onSubmit }) => {
  const [wineName, setWineName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("Red");
  const [rating, setRating] = useState(0);

  const handleRegister = () => {
    const wineData: WineData = {
      wineName,
      price: Number(price.replace(/,/g, "")),  // 문자열 가격을 숫자로 변환
      origin,
      type,
      rating,
    };
    onSubmit(wineData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2>와인 등록</h2>
          <button className={styles.close_button} onClick={onClose}>×</button>
        </div>

        <div className={styles.modal_body}>
          <label className={styles.label}>와인 이름</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="와인 이름 입력"
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
          />

          <label className={styles.label}>가격</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="가격 입력"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className={styles.label}>원산지</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="원산지 입력"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <label className={styles.label}>타입</label>
          <select 
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Sparkling">Sparkling</option>
          </select>

          <label className={styles.label}>별점</label>
          <div className={styles.rating_container}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${rating >= star ? styles.star_selected : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

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
