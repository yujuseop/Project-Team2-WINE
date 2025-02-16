import React, { useState, useEffect } from "react";
import styles from "./EditWineRegisterModal.module.css"; // 기존 스타일 유지

export interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

interface EditWineRegisterModalProps {
  onClose: () => void;
  onSubmit: (wineData: WineData) => void;
  initialData: WineData;
}

const EditWineRegisterModal: React.FC<EditWineRegisterModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [wineName, setWineName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price.toString() || "");
  const [origin, setOrigin] = useState(initialData.region || "");
  const [type, setType] = useState(initialData.type);
  const [imageUrl, setImageUrl] = useState(initialData.image || "");

  useEffect(() => {
    if (initialData) {
      setWineName(initialData.name || "");
      setPrice(initialData.price.toString() || "");
      setOrigin(initialData.region || "");
      setType(initialData.type || "RED"); // 기존 type 유지
      setImageUrl(initialData.image || "");
    }
  }, [initialData]);

  // 가격 입력 숫자만 허용
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value.replace(/[^0-9]/g, ""));
  };

  // 수정 버튼 클릭
  const handleSubmit = () => {
    if (!wineName.trim() || !price.trim() || !origin.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const updatedWine: WineData = {
      id: initialData.id,
      name: wineName,
      region: origin,
      price: parseFloat(price),
      type,
      image: imageUrl,
    };

    onSubmit(updatedWine);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2>와인 수정</h2>
        </div>

        <div className={styles.modal_body_scrollable}>
          <label className={styles.label}>와인 이름</label>
          <input
            className={styles.input}
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
          />

          <label className={styles.label}>가격</label>
          <input
            className={styles.input}
            value={price}
            onChange={handlePriceChange}
            type="text"
          />

          <label className={styles.label}>원산지</label>
          <input
            className={styles.input}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
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

          <label className={styles.label}>이미지 URL</label>
          <input
            className={styles.input}
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button className={styles.register_button} onClick={handleSubmit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWineRegisterModal;
