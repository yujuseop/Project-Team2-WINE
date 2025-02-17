import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "@/libs/axios";
import { AxiosError } from "axios";
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
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; //구글 clinetID
const GOOGLE_REDIRECT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL ??
  "http://default-google-redirect-url.com";

function SignIn({ id }: LoginProps) {
  const [values, setValues] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code&state=KAKAO`;
    window.location.href = kakaoAuthUrl; // 카카오 동의하기 화면 보여주기
  };

  const handleGoogleLogin = () => {
    const nonce = Math.random().toString(36).substring(2, 15); //보안 강화를 위한 난수
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${GOOGLE_REDIRECT_URL}&` +
      `response_type=token id_token&` + // 인가코드 대신에 id_token을 요청
      `scope=openid%20profile%20email&` +
      `nonce=${nonce}&` + // CSRF 방지용 nonce
      `state=GOOGLE`;
    window.location.href = googleAuthUrl;
  };

  const exchangeCodeForToken = async (
    provider: "KAKAO",
    code: { redirectUri: string; token: string }
  ) => {
    try {
      const response = await axios.post(`/auth/signIn/${provider}`, code);
      return response;
      // Cookies.set("accessToken", data.accessToken, { expires: 0.1, path: "/" });
      // Cookies.set("refreshToken", data.refreshToken, { expires: 1, path: "/" });
      //router.push("/");
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    }
  };

  const exchangeIdTokenForToken = async (
    provider: "GOOGLE",
    token: { idToken: string }
  ) => {
    try {
      const response = await axios.post(`/auth/signIn/${provider}`, token);
      return response;
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    }
  };

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.hash.substring(1)); // # 해시 파라미터 읽기
  //   const idToken = params.get("id_token");  // ID 토큰 추출
  //   const state = params.get("state");

  //   if (!idToken || !state) return;

  //   if (state === "GOOGLE") {
  //     console.log(`🔹 Google ID 토큰 확인:`, idToken);

  //     exchangeIdTokenForToken("GOOGLE", { idToken }) // ID 토큰을 백엔드로 전송
  //       .then((response) => {
  //         if (response?.data) {
  //           Cookies.set("accessToken", response.data.accessToken, { expires: 0.1 });
  //           Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 });
  //           router.push("/");
  //         } else {
  //           console.error(`🚨 Google 로그인 실패: 응답이 없습니다.`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(`🚨 Google 로그인 실패:`, error);
  //       });
  //   }
  // }, [router]);

  // const exchangeIdTokenForToken = async (provider: "GOOGLE", token: { idToken: string }) => {
  //   try {
  //     const response = await axios.post(`/auth/signIn/${provider}`, token);
  //     return response;
  //   } catch (error) {
  //     console.error(`${provider} 로그인 실패:`, error);
  //   }
  // };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const idToken = params.get("id_token"); //ID토큰 추출
    const code = params.get("code");
    const state = params.get("state"); // state 확인

    if (!code || !state) return;

    if (!idToken) {
      console.error("google 로그인 실패 : id_token 없음");
      return;
    }

    console.log("google 로그인 id_token:", idToken);

    let provider: "KAKAO" | "GOOGLE";
    let redirectUri: string;

    if (state === "KAKAO") {
      provider = "KAKAO";
      redirectUri = KAKAO_REDIRECT_URL;
    } else if (state === "GOOGLE") {
      provider = "GOOGLE";
      redirectUri = GOOGLE_REDIRECT_URL;
    } else {
      console.error("지원되지 않는 로그인 방식:", state);
      return;
    }

    console.log(`🔹 ${provider} 인가코드 확인:`, code);
    console.log(`${provider} id_token확인:`, idToken);

    exchangeCodeForToken("KAKAO", { redirectUri, token: code })
      .then((response) => {
        if (response?.data) {
          Cookies.set("accessToken", response.data.accessToken, {
            expires: 0.1,
          });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 1,
          });
          router.push("/");
        } else {
          console.error(`🚨 ${provider} 로그인 실패: 응답이 없습니다.`);
        }
      })
      .catch((error) => {
        console.error(`🚨 ${provider} 로그인 실패:`, error);
      });

    exchangeIdTokenForToken("GOOGLE", { idToken }) // ID 토큰을 백엔드로 전송
      .then((response) => {
        if (response?.data) {
          Cookies.set("accessToken", response.data.accessToken, {
            expires: 0.1,
          });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 1,
          });
          router.push("/");
        } else {
          console.error(`🚨 Google 로그인 실패: 응답이 없습니다.`);
        }
      })
      .catch((error) => {
        console.error(`🚨 Google 로그인 실패:`, error);
      });
  }, [router]);

  //내가 한 부분
  // useEffect(()=>{
  //   //const code = router.query.code as string;
  //   const params = new URLSearchParams(window.location.search);
  //   const Code = params.get("code");

  //   const state = params.get("state");

  //   if (state === "KAKAO"){
  //     console.log("인가코드확인:", Code)// 디버깅 코드
  //     exchangeCodeForToken("KAKAO",{redirectUri: KAKAO_REDIRECT_URL, token: Code})
  //     .then((response)=>{
  //       Cookies.set("accessToken", response?.data.accessToken);
  //       Cookies.set("refreshToken", response?.data.refreshToken);
  //       router.push("/");
  //     }
  //   )
  //   } else if (state === "GOOGLE"){
  //     console.log("인가코드확인:", Code)//디버깅 코드
  //     exchangeCodeForToken("GOOGLE", {redirectUri:GOOGLE_REDIRECT_URL, token:Code})
  //     .then((response)=>{
  //       Cookies.set("accessToken", response?.data.accessToken);
  //       Cookies.set("refreshToken", response?.data.refreshToken);
  //       router.push("/")
  //     }
  //   )
  //   }
  // },[]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value
        ? ""
        : `${name === "email" ? "이메일" : "비밀번호"}입력은 필수입니다.`,
    }));
  }
  function handleFocusIn(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = values;
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "이메일 입력은 필수입니다.";
    } else if (!email.includes("e")) {
      newErrors.email = "이메일 형식으로 작성해주세요.";
    }
    if (!password) newErrors.password = "비밀번호 입력은 필수입니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
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

        await router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.warn("로그인 실패:", error.response?.data || error.message); //error를 쓰면 오류메시지 화면에 출력, 방지하기 위해 warn사용.
        if (error.response?.status === 400) {
          //400에러일 때 사용자에게만 메시지 표시
          setErrors({
            email: "이메일 또는 비밀번호가 잘못되었습니다.",
            password: "",
          });
        }
        //next.js 에러화면 방지
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      }
    }
  }

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
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>
          <Link href="/" className={styles.forget_password}>
            비밀번호를 잊으셨나요?
          </Link>
          <PrimaryButton className={styles.button}>로그인</PrimaryButton>
          <SecondaryButton
            className={styles.outside_signin}
            onClick={handleGoogleLogin}
          >
            <Image src={google_icon} alt="구글 아이콘" />
            Google로 시작하기
          </SecondaryButton>
          <SecondaryButton
            className={styles.outside_signin}
            onClick={handleKakaoLogin}
          >
            <Image src={kakao_icon} alt="카카오 아이콘" />
            kakao로 시작하기
          </SecondaryButton>
          <div className={styles.move_login}>
            계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
