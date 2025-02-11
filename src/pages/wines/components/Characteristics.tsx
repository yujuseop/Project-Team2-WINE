import React from "react";
import styles from "./Characteristics.module.css";

interface CharacteristicsProps {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  readOnly: boolean;
  className?: string;
  inputClassName?: string;

  // onChange 핸들러들, 필요한 경우만 전달
  onLightBoldChange?: (value: number) => void;
  onSmoothTannicChange?: (value: number) => void;
  onDrySweetChange?: (value: number) => void;
  onSoftAcidicChange?: (value: number) => void;
}

const Characteristics: React.FC<CharacteristicsProps> = ({
  lightBold,
  smoothTannic,
  drySweet,
  softAcidic,
  readOnly,
  className,
  inputClassName,
  onLightBoldChange,
  onSmoothTannicChange,
  onDrySweetChange,
  onSoftAcidicChange,
}) => {
  return (
    <div className={`${styles.characteristics} ${className}`}>
      {/* lightBold */}
      <div className={styles.characteristic}>
        <span className={styles.characteristic_title}>바디감</span>
        <div className={styles.characteristic_main}>
          <span>가벼워요</span>
          <input
            type="range"
            min="0"
            max="10"
            value={lightBold}
            onChange={(e) =>
              onLightBoldChange && onLightBoldChange(Number(e.target.value))
            }
            readOnly={readOnly}
            className={`${styles.input} ${inputClassName}`}
          />
          <span className={styles.characteristic_right}>진해요</span>
        </div>
      </div>

      {/* smoothTannic */}
      <div className={styles.characteristic}>
        <span className={styles.characteristic_title}>타닌</span>
        <div className={styles.characteristic_main}>
          <span>부드러워요</span>
          <input
            type="range"
            min="0"
            max="10"
            value={smoothTannic}
            onChange={(e) =>
              onSmoothTannicChange &&
              onSmoothTannicChange(Number(e.target.value))
            }
            readOnly={readOnly}
            className={`${styles.input} ${inputClassName}`}
          />
          <span className={styles.characteristic_right}>떫어요</span>
        </div>
      </div>

      {/* drySweet */}
      <div className={styles.characteristic}>
        <span className={styles.characteristic_title}>당도</span>
        <div className={styles.characteristic_main}>
          <span>드라이해요</span>
          <input
            type="range"
            min="0"
            max="10"
            value={drySweet}
            onChange={(e) =>
              onDrySweetChange && onDrySweetChange(Number(e.target.value))
            }
            readOnly={readOnly}
            className={`${styles.input} ${inputClassName}`}
          />
          <span className={styles.characteristic_right}>달아요</span>
        </div>
      </div>

      {/* softAcidic */}
      <div className={styles.characteristic}>
        <span className={styles.characteristic_title}>산미</span>
        <div className={styles.characteristic_main}>
          <span>안셔요</span>
          <input
            type="range"
            min="0"
            max="10"
            value={softAcidic}
            onChange={(e) =>
              onSoftAcidicChange && onSoftAcidicChange(Number(e.target.value))
            }
            readOnly={readOnly}
            className={`${styles.input} ${inputClassName}`}
          />
          <span className={styles.characteristic_right}>많이셔요</span>
        </div>
      </div>
    </div>
  );
};

export default Characteristics;

// import React from "react";
// import styles from "./Characteristics.module.css";

// interface CharacteristicsProps {
//   lightBold: number;
//   smoothTannic: number;
//   drySweet: number;
//   softAcidic: number;
//   readOnly: boolean;
//   className?: string;
//   inputClassName?: string; // input에 대한 className 추가
// }

// const Characteristics: React.FC<CharacteristicsProps> = ({
//   lightBold,
//   smoothTannic,
//   drySweet,
//   softAcidic,
//   readOnly,
//   className,
//   inputClassName,
// }) => {
//   return (
//     <div className={`${styles.characteristics} ${className}`}>
//       {/* lightBold */}
//       <div className={styles.characteristic}>
//         <span className={styles.characteristic_title}>바디감</span>
//         <div className={styles.characteristic_main}>
//           <span>가벼워요</span>
//           <input
//             type="range"
//             min="0"
//             max="10"
//             value={lightBold}
//             readOnly={readOnly}
//             className={`${styles.input} ${inputClassName}`} // input에 className 전달
//           />
//           <span className={styles.characteristic_right}>진해요</span>
//         </div>
//       </div>
//       {/* smoothTannic */}
//       <div className={styles.characteristic}>
//         <span className={styles.characteristic_title}>타닌</span>
//         <div className={styles.characteristic_main}>
//           <span>부드러워요</span>
//           <input
//             type="range"
//             min="0"
//             max="10"
//             value={smoothTannic}
//             readOnly={readOnly}
//             className={`${styles.input} ${inputClassName}`} // input에 className 전달
//           />
//           <span className={styles.characteristic_right}>떫어요</span>
//         </div>
//       </div>
//       {/* drySweet */}
//       <div className={styles.characteristic}>
//         <span className={styles.characteristic_title}>당도</span>
//         <div className={styles.characteristic_main}>
//           <span>드라이해요</span>
//           <input
//             type="range"
//             min="0"
//             max="10"
//             value={drySweet}
//             readOnly={readOnly}
//             className={`${styles.input} ${inputClassName}`} // input에 className 전달
//           />
//           <span className={styles.characteristic_right}>달아요</span>
//         </div>
//       </div>
//       {/* softAcidic */}
//       <div className={styles.characteristic}>
//         <span className={styles.characteristic_title}>산미</span>
//         <div className={styles.characteristic_main}>
//           <span>안셔요</span>
//           <input
//             type="range"
//             min="0"
//             max="10"
//             value={softAcidic}
//             readOnly={readOnly}
//             className={`${styles.input} ${inputClassName}`} // input에 className 전달
//           />
//           <span className={styles.characteristic_right}>많이셔요</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Characteristics;
