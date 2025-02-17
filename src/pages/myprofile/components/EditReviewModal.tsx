import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Characteristics from "@/pages/wines/components/Characteristics";
import styles from "./EditReviewModal.module.css";
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
  wine: {
    id: number;
    name: string;
  };
}

interface EditReviewModalProps {
  wineId: number;
  onClose: () => void;
  onReviewSubmit: (newReview: Review) => void;
  onReviewUpdate: (updatedReview: Review) => void;
  existingReview?: Review;
  isEditing?: boolean;
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

const EditReviewModal: React.FC<EditReviewModalProps> = ({
  onClose,
  onReviewSubmit,
  onReviewUpdate,
  existingReview,
  isEditing = false,
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

  // ✅ 기존 리뷰 데이터를 불러와 입력 필드에 설정
  useEffect(() => {
    if (existingReview && isEditing) {
      setRating(existingReview.rating);
      setContent(existingReview.content);
      setLightBold(existingReview.lightBold);
      setSmoothTannic(existingReview.smoothTannic);
      setDrySweet(existingReview.drySweet);
      setSoftAcidic(existingReview.softAcidic);
      setSelectedAromas(
        existingReview.aroma.map(
          (a) =>
            Object.keys(aromaMapping).find((key) => aromaMapping[key] === a) ||
            a
        )
      );
    }
  }, [existingReview, isEditing]);

  const toggleAroma = (aroma: string) => {
    const updatedAromas = selectedAromas.includes(aroma)
      ? selectedAromas.filter((a) => a !== aroma)
      : [...selectedAromas, aroma];

    setSelectedAromas(updatedAromas);
  };

  const handleSubmit = async () => {
    // 필수 입력값 검증
    const isAromaError = selectedAromas.length === 0;
    setAromaError(isAromaError);

    const isContentError = !content.trim();
    setContentError(isContentError);

    if (isAromaError || isContentError) {
      console.log("입력값 오류: ", { isAromaError, isContentError });
      return;
    }

    // 서버로 보낼 데이터
    const requestData = {
      rating,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: selectedAromas.map((aroma) => aromaMapping[aroma]),
      content,
    };

    console.log("보내는 데이터:", JSON.stringify(requestData, null, 2));
    console.log("리뷰 ID:", existingReview?.id);
    console.log("Authorization 토큰:", token);

    try {
      const response = await fetch(
        isEditing ? `/reviews/${existingReview?.id}` : "/reviews",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      console.log("응답 상태 코드:", response.status);

      if (response.ok) {
        const updatedReview = await response.json();
        console.log("업데이트된 리뷰 데이터:", updatedReview);

        if (isEditing) {
          onReviewUpdate(updatedReview);
        } else {
          onReviewSubmit(updatedReview);
        }
        onClose();
      } else {
        console.error("서버 오류 응답:", await response.json());
        alert("후기를 작성해주세요.");
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2>{isEditing ? "리뷰 수정" : "리뷰 등록"}</h2>
          <button className={styles.close_button} onClick={onClose}>
            ×
          </button>
        </div>

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.button_group}>
            <SecondaryButton onClick={onClose}>취소하기</SecondaryButton>
            <PrimaryButton type="submit">수정하기</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;
