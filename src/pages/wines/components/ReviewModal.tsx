import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import ReviewButton from "./ReviewButton";
import Characteristics from "./Characteristics";
import styles from "./ReviewModal.module.css";
import Image from "next/image";

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
  const [lightBold, setLightBold] = useState(0);
  const [smoothTannic, setSmoothTannic] = useState(0);
  const [drySweet, setDrySweet] = useState(0);
  const [softAcidic, setSoftAcidic] = useState(0);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [aromaError, setAromaError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const token = Cookies.get("accessToken");

  const toggleAroma = (aroma: string) => {
    const updatedAromas = selectedAromas.includes(aroma)
      ? selectedAromas.filter((a) => a !== aroma)
      : [...selectedAromas, aroma];

    setSelectedAromas(updatedAromas);
  };

  const handleSubmit = async () => {
    // 향이 선택되지 않으면 aromaError를 true로 설정
    const isAromaError = selectedAromas.length === 0;
    setAromaError(isAromaError);

    // 리뷰 내용이 비어 있으면 contentError를 true로 설정
    const isContentError = !content.trim();
    setContentError(isContentError);

    // 향도 선택되지 않고 후기도 비어 있을 경우 둘 다 에러 메시지를 표시
    if (isAromaError && isContentError) {
      return;
    }

    // 내용과 향이 모두 있을 경우 정상적으로 데이터 전송
    if (!isAromaError && !isContentError) {
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
          const newReview = await response.json();
          onReviewSubmit(newReview);
          onClose();
        } else {
          alert("후기를 작성해주세요.");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className={styles.modal_header}>
          <h2>리뷰 등록</h2>
          <button className={styles.close_button} onClick={onClose}>
            ×
          </button>
        </div>

        {/* 이미지 및 평점 */}
        <div className={styles.img_rating}>
          <div className={styles.modal_img}>
            <Image
              src="/assets/icon/wine_img.svg"
              alt="와인 이미지"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className={styles.rating_section}>
            {[1, 2, 3, 4, 5].map((num) => (
              <FaStar
                key={num}
                className={
                  num <= rating ? styles.filled_star : styles.empty_star
                }
                onClick={() => setRating(num)}
              />
            ))}
          </div>
        </div>

        {/* 후기에 대한 텍스트 */}
        <div className={styles.textarea_section}>
          <textarea
            className={styles.textarea}
            placeholder="후기를 작성해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {contentError && (
            <p className={styles.content_error}>※ 후기를 작성해주세요</p>
          )}
        </div>

        <h3>와인의 맛은 어땠나요?</h3>
        <Characteristics
          lightBold={lightBold}
          smoothTannic={smoothTannic}
          drySweet={drySweet}
          softAcidic={softAcidic}
          readOnly={false}
          className={styles.characteristics}
          inputClassName={styles.custom_input}
          onLightBoldChange={setLightBold}
          onSmoothTannicChange={setSmoothTannic}
          onDrySweetChange={setDrySweet}
          onSoftAcidicChange={setSoftAcidic}
        />

        {/* 향 */}
        <div className={styles.aroma_section}>
          <h3>기억에 남는 향이 있나요?</h3>
          {aromaError && (
            <p className={styles.aroma_error}>1개 이상 선택해주세요</p>
          )}
          <div className={styles.aroma_tags}>
            {Object.keys(aromaMapping).map((aroma) => (
              <button
                key={aroma}
                className={
                  selectedAromas.includes(aroma)
                    ? styles.selected_aroma
                    : styles.aroma
                }
                onClick={() => toggleAroma(aroma)}
              >
                {aroma}
              </button>
            ))}
          </div>
        </div>

        {/* 리뷰 제출 버튼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ReviewButton type="submit" className={styles.review_button}>
            리뷰 남기기
          </ReviewButton>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
