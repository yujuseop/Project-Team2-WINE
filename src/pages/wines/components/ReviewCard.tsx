import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import TimeAgo from "@/components/TimeAgo";
import styles from "./ReviewCard.module.css";

// 영어에서 한국어로 변환할 맵핑 객체
const aromaTranslations: { [key: string]: string } = {
  CHERRY: "체리",
  BERRY: "베리",
  OAK: "오크",
  VANILLA: "바닐라",
  PEPPER: "후추",
  BAKING: "제빵",
  GRASS: "풀",
  APPLE: "사과",
  PEACH: "복숭아",
  CITRUS: "시트러스",
  TROPICAL: "트로피컬",
  MINERAL: "미네랄",
  FLOWER: "꽃",
  TOBACCO: "담뱃잎",
  EARTH: "흙",
  CHOCOLATE: "초콜릿",
  SPICE: "스파이스",
  CARAMEL: "카라멜",
  LEATHER: "가죽",
};

// 리뷰 타입 정의
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
  } | null;
  isLiked: boolean;
}

// Props 타입 설정
interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const user =
    review.user && typeof review.user === "object"
      ? review.user
      : {
          nickname: "Anonymous",
          image: "/assets/icon/user_empty_img.svg",
        };

  const hasCharacteristics =
    review.lightBold > 0 ||
    review.smoothTannic > 0 ||
    review.drySweet > 0 ||
    review.softAcidic > 0;

  // aroma를 한국어로 변환
  const translatedAroma = review.aroma.map(
    (aroma) => aromaTranslations[aroma] || aroma
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {/* 유저 정보 영역 */}
        <div className={styles.user_container}>
          <Image
            className={styles.profile_img}
            src={user.image ?? ""}
            alt="profile"
            width={64}
            height={64}
            priority
          />
          <div>
            <p className={styles.user_nickname}>{user.nickname}</p>
            <TimeAgo date={review.createdAt} />
          </div>
        </div>
        {/* react에서 제공하는 아이콘 영역 */}
        <div className={styles.icon}>
          <FaRegHeart className={styles.heart} />
          <BsThreeDotsVertical className={styles.dropdown} />
        </div>
      </div>

      {/* aroma 및 평점 영역 */}
      <div className={styles.aroma_rating_container}>
        <div className={styles.aroma_tags}>
          {translatedAroma.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.rating_star} />
          <span> {review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className={styles.review_text}>{review.content}</p>

      {/* Characteristic영역 */}
      {hasCharacteristics && (
        <div className={styles.characteristics}>
          {/* lightBold */}
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>바디감</span>
            <div className={styles.characteristic_main}>
              <span>가벼워요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.lightBold}
                readOnly
              />
              <span className={styles.characteristic_right}>진해요</span>
            </div>
          </div>
          {/* smoothTannic */}
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>타닌</span>
            <div className={styles.characteristic_main}>
              <span>부드러워요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.smoothTannic}
                readOnly
              />
              <span className={styles.characteristic_right}>떫어요</span>
            </div>
          </div>
          {/* drySweet */}
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>당도</span>
            <div className={styles.characteristic_main}>
              <span>드라이해요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.drySweet}
                readOnly
              />
              <span className={styles.characteristic_right}>달아요</span>
            </div>
          </div>
          {/* softAcidic */}
          <div className={styles.characteristic}>
            <span className={styles.characteristic_tite}>산미</span>
            <div className={styles.characteristic_main}>
              <span>안셔요</span>
              <input
                type="range"
                min="0"
                max="10"
                value={review.softAcidic}
                readOnly
              />
              <span className={styles.characteristic_right}>많이셔요</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

// import React from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaRegHeart, FaStar } from "react-icons/fa";
// import Image from "next/image";
// import TimeAgo from "@/components/TimeAgo";
// import styles from "./ReviewCard.module.css";

// // 리뷰 타입 정의
// interface Review {
//   id: number;
//   rating: number;
//   aroma: string[];
//   content: string;
//   createdAt: string;
//   lightBold: number;
//   smoothTannic: number;
//   drySweet: number;
//   softAcidic: number;
//   user: {
//     nickname: string | null;
//     image: string | null;
//   } | null;
//   isLiked: boolean;
// }

// // Props 타입 설정
// interface ReviewCardProps {
//   review: Review;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
//   const user =
//     review.user && typeof review.user === "object"
//       ? review.user
//       : {
//           nickname: "Anonymous",
//           image: "/assets/icon/user_empty_img.svg",
//         };

//   const hasCharacteristics =
//     review.lightBold > 0 ||
//     review.smoothTannic > 0 ||
//     review.drySweet > 0 ||
//     review.softAcidic > 0;

//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         {/* 유저 정보 영역 */}
//         <div className={styles.user_container}>
//           <Image
//             className={styles.profile_img}
//             src={user.image ?? ""}
//             alt="profile"
//             width={64}
//             height={64}
//             priority
//           />
//           <div>
//             <p className={styles.user_nickname}>{user.nickname}</p>
//             <TimeAgo date={review.createdAt} />
//           </div>
//         </div>
//         {/* react에서 제공하는 아이콘 영역 */}
//         <div className={styles.icon}>
//           <FaRegHeart className={styles.heart} />
//           <BsThreeDotsVertical className={styles.dropdown} />
//         </div>
//       </div>

//       {/* aroma 및 평점 영역 */}
//       <div className={styles.aroma_rating_container}>
//         <div className={styles.aroma_tags}>
//           {review.aroma.map((tag, index) => (
//             <span key={index} className={styles.tag}>
//               {tag}
//             </span>
//           ))}
//         </div>
//         <div className={styles.rating}>
//           <FaStar className={styles.rating_star} />
//           <span> {review.rating.toFixed(1)}</span>
//         </div>
//       </div>

//       <p className={styles.review_text}>{review.content}</p>

//       {/* Characteristic영역 */}
//       {hasCharacteristics && (
//         <div className={styles.characteristics}>
//           {/* lightBold */}
//           <div className={styles.characteristic}>
//             <span className={styles.characteristic_tite}>바디감</span>
//             <div className={styles.characteristic_main}>
//               <span>가벼워요</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="10"
//                 value={review.lightBold}
//                 readOnly
//               />
//               <span className={styles.characteristic_right}>진해요</span>
//             </div>
//           </div>
//           {/* smoothTannic */}
//           <div className={styles.characteristic}>
//             <span className={styles.characteristic_tite}>타닌</span>
//             <div className={styles.characteristic_main}>
//               <span>부드러워요</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="10"
//                 value={review.smoothTannic}
//                 readOnly
//               />
//               <span className={styles.characteristic_right}>떫어요</span>
//             </div>
//           </div>
//           {/* drySweet */}
//           <div className={styles.characteristic}>
//             <span className={styles.characteristic_tite}>당도</span>
//             <div className={styles.characteristic_main}>
//               <span>드라이해요</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="10"
//                 value={review.drySweet}
//                 readOnly
//               />
//               <span className={styles.characteristic_right}>달아요</span>
//             </div>
//           </div>
//           {/* softAcidic */}
//           <div className={styles.characteristic}>
//             <span className={styles.characteristic_tite}>산미</span>
//             <div className={styles.characteristic_main}>
//               <span>안셔요</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="10"
//                 value={review.softAcidic}
//                 readOnly
//               />
//               <span className={styles.characteristic_right}>많이셔요</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewCard;
