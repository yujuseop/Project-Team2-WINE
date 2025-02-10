import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo_white from "../../public/assets/images/logo_white.svg";
import {useEffect, useState} from "react";


/**
 * 
 * 로컬스토리지에 있는 유저토큰을 활용해 로그인을 하기 전에는 로그인과 회원가입이 나오고 
 * 로그인을 성공하면은 프로필사진이 나오게 해야한다.
 * 후에 로그아웃을 하면 다시 로그인과 회원가입이 나오게 해야한다.
 */


export default function Header() {
  const [isLogIn, setIsLogIn ] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    setIsLogIn(!!token);
  }, []);
  
 

  const handleLogout = () =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogIn(false);
    window.location.href ="/login"
  };

  return (
    <header className={styles.header}>
        <Link className="logo" href="/">
          <Image src={logo_white} alt="로고이미지" width="51" height="15" />
        </Link>
        <div className={styles.sign}>
          {isLogIn ?(
            <div>
            <Image src="/path/to/profile/image.jpg" alt="프로필 사진" width="30" height="30" className={styles.profile_image} />
          <button onClick={handleLogout} className="styles.logout_button">로그아웃</button>
          </div>
          ):(
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
          )};
        </div>
    </header>
  );
}
