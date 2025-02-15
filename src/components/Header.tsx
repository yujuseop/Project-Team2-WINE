import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo_white from "../../public/assets/images/logo_white.svg";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "@/libs/axios";

export default function Header() {
  const [isLogIn, setIsLogIn] = useState(false); // 유저상태관리
  const [profileIamge, setProfileImage] = useState<string | null>(null); //사용자 프로필이미지 관리

  useEffect(() => {
    const token = Cookies.get("accessToken"); //
    setIsLogIn(!!token);

    if (token) {
      //사용자 프로필 데이터 가져오기
      axios
        .get("users/me")
        .then((response) => {
          const { image } = response.data;
          setProfileImage(image || "/assets/icon/defaultProfile.png");
        })
        .catch((error) => {
          console.error("유저 데이터 가져오기 실패", error);
        });
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLogIn(false);
    window.location.href = "/";
  };

  return (
    <header className={styles.header}>
      <Link className="logo" href="/">
        <Image src={logo_white} alt="로고이미지" width="51" height="15" />
      </Link>
      <div className={styles.sign}>
        {isLogIn ? (
          <div>
            {profileIamge && (
              <Image
                src={profileIamge}
                alt="프로필 사진"
                width="30"
                height="30"
                className={styles.profile_image}
              />
            )}
            <button onClick={handleLogout} className="styles.logout_button">
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <div>
              <Link className={styles.header_login} href="login">
                <p>로그인</p>
              </Link>
            </div>
            <div>
              <Link className={styles.header_sign} href="signup">
                <p>회원가입</p>
              </Link>
            </div>
          </>
        )}
        ;
      </div>
    </header>
  );
}
