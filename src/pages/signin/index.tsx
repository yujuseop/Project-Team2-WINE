import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "@/libs/axios";
import Label from "@/components/Label";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import logo_black from "../../../public/assets/images/logo_black.svg";
import styles from "./SignIn.module.css";
import Cookies from "js-cookie"; // 쿠키 저장 라이브러리 추가
import SecondaryButton from "@/components/SecondaryButton";
import google_icon from "../../../public/assets/icon/google.svg";
import kakao_icon from "../../../public/assets/icon/kakao.svg";



interface LoginProps {
  id: string;
  className?: string;
}

interface LoginState {
  email: string;
  password: string;
}

const KAKAO_CLIENT_ID = "8ea4edfdb003b0c42a724d9198522938"; // 카카오 rest api키
const KAKAO_REDIRECT_URL = "http://localhost:3000/signin"; 

function SignIn({ id }: LoginProps) {
  const [values, setValues] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{email?:string; password?: string}>({});
  const router = useRouter();

  const handleKakaoLogin = () =>{
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = kakaoAuthUrl;// 카카오 동의하기 화면 보여주기
  };

  const exchangeCodeForToken = async (code: {redirectUri:string; token:string;}) => {
    try {
      const response  = await axios.post("/auth/signIn/KAKAO", code);
      return response;
      // Cookies.set("accessToken", data.accessToken, { expires: 0.1, path: "/" });
      // Cookies.set("refreshToken", data.refreshToken, { expires: 1, path: "/" });
      //router.push("/");
    } catch (error ) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  useEffect(()=>{
    //const code = router.query.code as string;
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get("code");
    
    if (kakaoCode){
      console.log("인가코드확인:", kakaoCode)// 디버깅 코드
      exchangeCodeForToken({redirectUri: KAKAO_REDIRECT_URL, token:kakaoCode})
      .then((response)=>{
        Cookies.set("accessToken", response?.data.accessToken);
        Cookies.set("refreshToken", response?.data.refreshToken);
        window.location.href = "http://localhost:3000"; 
        //router.push("/");
      }
    )
    }
  },[]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleFocusOut(e: React.FocusEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setErrors((prevErrors)=>({
      ...prevErrors,
    [name]: value? "" : `${name === "email" ? "이메일" : "비밀번호"}입력은 필수입니다.`, 
    }));
  }
  function handleFocusIn(e:React.FocusEvent<HTMLInputElement>){
    const {name} = e.target;
    setErrors((prevErrors)=>({
      ...prevErrors,
      [name]:"",
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = values;
    const newErrors: {email?:string; password?:string} ={}; 

    if(!email) {newErrors.email = "이메일 입력은 필수입니다.";
    }else if (!email.includes("e")) { newErrors.email= "이메일 형식으로 작성해주세요.";
    }
    if(!password) newErrors.password="비밀번호 입력은 필수입니다.";
  
   

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return
    }

    try {
      const response = await axios.post("/auth/signIn", { email, password });

      if (response.data.accessToken && response.data.refreshToken) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // accessToken을 2시간 24분 동안 유지
        Cookies.set("accessToken", accessToken, { expires: 0.1, path: "/" });

        // refreshToken을 1일 동안 유지
        Cookies.set("refreshToken", refreshToken, { expires: 1, path: "/" });

        router.push("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 정보를 확인하세요.");
    }
  };

  

  return (
    <div className={styles.signin_container}>
      <div id={id} className={styles.signin_form}>
        <div className={styles.logo}>
          <Image src={logo_black} alt="로고 이미지" />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.email}>
          <Label className={styles.label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.input}
            name="email"
            type="text"
            placeholder="이메일 입력"
            onChange={handleChange}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            value={values.email}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div className={styles.password}>
          <Label className={styles.label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.input}
            name="password"
            type="password"
            placeholder="비밀번호 입력"
            value={values.password}
            onChange={handleChange}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <PrimaryButton className={styles.button}>로그인</PrimaryButton>
          <SecondaryButton className={styles.google_signin} ><Image src={google_icon} alt="구글 아이콘"/>Google로 시작하기</SecondaryButton>
          <SecondaryButton className={styles.kakao_signin} onClick={handleKakaoLogin}><Image src={kakao_icon} alt="카카오 아이콘"/>kakao로 시작하기</SecondaryButton>
          <div className={styles.move_login}>
            계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
