import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo_white from "../../public/assets/images/logo_white.svg";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "@/libs/axios";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/router";

export default function Header() {
  const [isLogIn, setIsLogIn] = useState(false); // 유저 상태 관리
  const [profileImage, setProfileImage] = useState<string>(
    "/assets/icon/defaultProfile.png"
  ); // 기본 프로필 이미지 설정
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsLogIn(!!token);

    if (token) {
      // 사용자 프로필 데이터 가져오기
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

  const handleImageError = () => {
    setProfileImage("/assets/icon/defaultProfile.png"); // 이미지 로딩 실패 시 기본 이미지로 설정
  };

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    setIsLogIn(false);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <Link className="logo" href="/">
        <Image
          src={logo_white}
          alt="로고 이미지"
          width={52}
          height={15}
          className={styles.logo_white}
          priority
        />
      </Link>
      <div className={styles.sign}>
        {isLogIn ? (
          <div>
            {profileImage && (
              <Image
                src={profileImage}
                alt="프로필 사진"
                width={40}
                height={40}
                className={styles.profile_image}
                priority
                onError={handleImageError} // 이미지 로딩 실패 시 기본 이미지로 변경
              />
            )}
            <CustomSelect
              options={["마이페이지", "로그아웃"]}
              onChange={(option) => {
                if (option === "마이페이지") {
                  router.push("/myprofile");
                }
                if (option === "로그아웃") {
                  handleLogout();
                }
              }}
            />
          </div>
        ) : (
          <>
            <div className={styles.sign}>
              <Link className={styles.header_login} href="signin">
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
      </div>
    </header>
  );
}
