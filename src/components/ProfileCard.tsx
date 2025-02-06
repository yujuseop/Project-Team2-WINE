import React from "react";
import styles from "./ProfileCard.module.css";
import PrimaryButton from "./PrimaryButton";
import Input from "./Input";

const ProfileCard: React.FC = () => {
  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_info}>
        <img
          src="/assets/icon/defaultProfile.png"
          alt="프로필 사진"
          className={styles.profile_image}
        />
        <div className={styles.profile_text}>
          {/* 임시설정 */}
          <h2 className={styles.profile_name}>완다</h2>
          <p className={styles.profile_email}>wanda95@email.com</p>
        </div>
      </div>

      <div className={styles.profile_details}>
        <label htmlFor="nickname" className={styles.nickname_label}>
          닉네임
        </label>
        <div className={styles.change_section}>
          <Input
            type="text"
            id="nickname"
            className={styles.nickname_input}
            placeholder="완다" //임시
          />
          <div>
            <PrimaryButton className={styles.change_button}>
              변경하기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
