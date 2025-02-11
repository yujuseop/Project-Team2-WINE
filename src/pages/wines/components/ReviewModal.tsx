import { useState } from "react";
import Cookies from "js-cookie";
import ReviewButton from "./ReviewButton";
import Characteristics from "./Characteristics";
import styles from "./ReviewModal.module.css";

interface Review {
  id: number;
  rating: number;
  aroma: string[];
  content: string;
  createdAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: {
    nickname: string | null;
    image: string | null;
  };
  isLiked: boolean;
}

interface ReviewModalProps {
  wineId: number;
  onClose: () => void;
  onReviewSubmit: (newReview: Review) => void;
}

const aromaMapping: Record<string, string> = {
  체리: "CHERRY",
  베리: "BERRY",
  오크: "OAK",
  바닐라: "VANILLA",
  후추: "PEPPER",
  제빵: "BAKING",
  풀: "GRASS",
  사과: "APPLE",
  복숭아: "PEACH",
  시트러스: "CITRUS",
  트로피컬: "TROPICAL",
  미네랄: "MINERAL",
  꽃: "FLOWER",
  담뱃잎: "TOBACCO",
  흙: "EARTH",
  초콜릿: "CHOCOLATE",
  스파이스: "SPICE",
  카라멜: "CARAMEL",
  가죽: "LEATHER",
};

const ReviewModal: React.FC<ReviewModalProps> = ({
  wineId,
  onClose,
  onReviewSubmit,
}) => {
  const [rating, setRating] = useState(4);
  const [content, setContent] = useState("");
  const [lightBold, setLightBold] = useState(5);
  const [smoothTannic, setSmoothTannic] = useState(5);
  const [drySweet, setDrySweet] = useState(5);
  const [softAcidic, setSoftAcidic] = useState(5);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);

  const token = Cookies.get("accessToken");

  const toggleAroma = (aroma: string) => {
    setSelectedAromas((prev) =>
      prev.includes(aroma) ? prev.filter((a) => a !== aroma) : [...prev, aroma]
    );
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const requestData = {
      rating,
      content,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: selectedAromas.map((a) => aromaMapping[a] || a),
      wineId,
    };

    try {
      const response = await fetch(
        "https://winereview-api.vercel.app/12-2/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const newReview = await response.json(); // 새로 등록된 리뷰 정보 가져오기
        onReviewSubmit(newReview); // 부모에게 리뷰 데이터 전달
        onClose();
      } else {
        alert("리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>리뷰 등록</h2>

        {/* Rating Section */}
        <div className={styles.ratingSection}>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= rating ? styles.filledStar : styles.emptyStar}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Content Section */}
        <textarea
          className={styles.textarea}
          placeholder="후기를 작성해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Characteristics Section */}
        <Characteristics
          lightBold={lightBold}
          smoothTannic={smoothTannic}
          drySweet={drySweet}
          softAcidic={softAcidic}
          readOnly={false}
          className={styles.characteristics}
          inputClassName={styles.input}
          onLightBoldChange={setLightBold}
          onSmoothTannicChange={setSmoothTannic}
          onDrySweetChange={setDrySweet}
          onSoftAcidicChange={setSoftAcidic}
        />

        {/* Aroma Selection Section */}
        <div className={styles.aromaSection}>
          <h3>기억에 남는 향이 있나요?</h3>
          <div className={styles.aromaTags}>
            {Object.keys(aromaMapping).map((aroma) => (
              <button
                key={aroma}
                className={
                  selectedAromas.includes(aroma)
                    ? styles.selectedAroma
                    : styles.aroma
                }
                onClick={() => toggleAroma(aroma)}
              >
                {aroma}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ReviewButton type="submit" className={styles.submitButton}>
            리뷰 남기기
          </ReviewButton>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
