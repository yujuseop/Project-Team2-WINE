import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 rest api키
const KAKAO_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL ??
  "http://default-kakao-redirect-url.com";

function SignIn({ id }: LoginProps) {
  const [values, setValues] = useState<LoginState>({
    email: "",
    password: "",
  }); //사용자가 입력한 이메일과 비밀번호 값을 저장하는 상태
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  ); //이메일과 비밀번호에 대한 에러메시지를 저장하는 상태
  const router = useRouter();

  const handleKakaoLogin = () => {
    //카카오 로그인 처리
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code&state=KAKAO`;
    window.location.href = kakaoAuthUrl; // 카카오 동의하기 화면 보여주기, 인증 후 인증코드를 받아오기 위해 redirect_uri설정.
  };

  const exchangeCodeForToken = async (
    provider: "KAKAO",
    code: { redirectUri: string; token: string }
  ) => {
    try {
      const response = await axios.post(`/auth/signIn/${provider}`, code);
      return response;
    } catch (error) {
      console.warn(`${provider} 로그인 실패:`, error);
    }
  }; //카카오 로그인 후 인증 코드를 서버에 보내서 엑세스 토큰과 리프레시 토큰을 받아온다. axios를 사용해 api에 post 요청 보냄.

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get("code");
    const state = params.get("state");
    //카카오 로그인 후 리다이렉트 url에서 code와 state를 추출하여 인증 진행

    if (state === "KAKAO" && kakaoCode) {
      console.log("인가 코드 확인:", kakaoCode); // 디버깅 코드

      exchangeCodeForToken("KAKAO", {
        redirectUri: KAKAO_REDIRECT_URL,
        token: kakaoCode,
      })
        .then((response) => {
          if (response && response.data) {
            //서버에서 응답하면 토큰 불러오기
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            if (accessToken && refreshToken) {
              //토큰을 쿠키에 저장
              Cookies.set("accessToken", accessToken, {
                expires: 0.1,
                path: "/",
              });
              Cookies.set("refreshToken", refreshToken, {
                expires: 1,
                path: "/",
              });
              //서버에서 받은 토큰을 쿠키에 저장.
              console.log("토큰 저장 완료", { accessToken, refreshToken }); // 토큰 저장확인

              // 쿠키가 저장된 후에만 리다이렉트
              router.push("/");
            }
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 오류:", error);
        });
    }
  }, [router]);

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
    //이메일과 비밀번호 유효성 검사 후, 유효하다면 서버로 로그인 요청을 보냄.

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("/auth/signIn", { email, password });

      if (response.data.accessToken && response.data.refreshToken) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        //로그인 성공 시 엑세스 토큰과 리프레시토큰을 쿠키에 저장.
        // accessToken을 2시간 24분 동안 유지
        Cookies.set("accessToken", accessToken, { expires: 0.1, path: "/" });

        // refreshToken을 1일 동안 유지
        Cookies.set("refreshToken", refreshToken, { expires: 1, path: "/" });

        await router.push("/"); //홈화면으로 이동.
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
    <>
      <Head>
        <title>WHYNE - 로그인</title>
      </Head>
      <div className={styles.signin_container}>
        <div id={id} className={styles.signin_form}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src={logo_black} alt="로고 이미지" />
            </div>
          </Link>
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
              {errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
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
              onClick={handleKakaoLogin}
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
    </>
  );
}

export default SignIn;
