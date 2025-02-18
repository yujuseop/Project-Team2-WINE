import React, { useState } from "react";
import styles from "./WineRegisterModal.module.css";

export interface WineData {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

interface WineRegisterModalProps {
  onClose: () => void;
  onSubmit: (wineData: WineData) => void;
}

const WineRegisterModal: React.FC<WineRegisterModalProps> = ({ onClose, onSubmit }) => {
  const [wineName, setWineName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState<"RED" | "WHITE" | "SPARKLING">("RED");
  const [imageUrl, setImageUrl] = useState("");

  const handleRegister = () => {
    if (!wineName.trim() || !price.trim() || !origin.trim() || !imageUrl.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const wineData: WineData = {
      name: wineName,
      region: origin,
      price: parseFloat(price),
      type,
      image: imageUrl,
    };

    // 등록 버튼 클릭하자마자 부모 컴포넌트에서 optimistic update를 통해 페이지에 바로 반영
    onSubmit(wineData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>와인 등록</h2>
          <button className={styles.close_button} onClick={onClose}>
            X
          </button>
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
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setType(e.target.value as "RED" | "WHITE" | "SPARKLING")}
          >
            <option value="RED">Red</option>
            <option value="WHITE">White</option>
            <option value="SPARKLING">Sparkling</option>
          </select>
          <label className={styles.label}>이미지 URL</label>
          <input
            className={styles.input}
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="이미지 URL (예: https://...)"
          />
        </div>
        <div className={styles.button_container}>
          <button className={styles.cancel_button} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.register_button}
            onClick={handleRegister}
            disabled={!wineName || !price || !origin || !imageUrl}
          >
            와인 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineRegisterModal;
