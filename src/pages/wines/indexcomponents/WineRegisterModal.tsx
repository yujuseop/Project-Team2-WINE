import React, { useState } from "react";
import styles from "./WineRegisterModal.module.css";

interface WineData {
  wineName: string;
  price: number;
  origin: string;
  type: string;
  rating: number;
}

interface WineRegisterModalProps {
  onClose: () => void;
  onSubmit: (wineData: WineData) => void;
}

const WineRegisterModal: React.FC<WineRegisterModalProps> = ({ onClose, onSubmit }) => {
  const [wineName, setWineName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("RED");
  const [rating, setRating] = useState(0);

  const handleRegister = () => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      alert("가격은 0원 이상의 숫자여야 합니다.");
      return;
    }

    const wineData: WineData = {
      wineName,
      price: numericPrice,
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
            required
          />

          <label className={styles.label}>가격</label>
          <input 
            type="text"  // 숫자 스핀 버튼 제거
            className={styles.input}
            placeholder="가격 입력"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label className={styles.label}>원산지</label>
          <input 
            type="text"
            className={styles.input}
            placeholder="원산지 입력"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />

          <label className={styles.label}>타입</label>
          <select 
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value.toUpperCase())}
          >
            <option value="RED">Red</option>
            <option value="WHITE">White</option>
            <option value="SPARKLING">Sparkling</option>
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
