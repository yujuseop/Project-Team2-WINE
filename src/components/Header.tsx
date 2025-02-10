import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo_white from "../../public/assets/images/logo_white.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className="logo" href="/">
        <Image src={logo_white} alt="로고이미지" width="51" height="15" />
      </Link>
      <div className={styles.sign}>
        <Link className={styles.header_login} href="login">
          <p>로그인</p>
        </Link>
        <Link className={styles.header_sign} href="signup">
          <p>회원가입</p>
        </Link>
      </div>
    </header>
  );
}
