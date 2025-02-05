import logo_black from "../../../public/assets/images/logo_black.svg"
import Image from "next/image";

export default function Login() {
  return (
    <div>
      <Image src={logo_black} alt="메인 로고 이미지"/>
      <p>이메일</p>
      <input/>
      <p>닉네임</p>
      <input/>
      <p>비밀번호</p>
      <input/>
      <p>비밀번호 확인</p>
      <input/>
    </div>
  );
}
