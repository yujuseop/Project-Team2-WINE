import { useState } from "react";
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

interface LoginProps {
  id: string;
  className?: string;
}

interface LoginState {
  email: string;
  password: string;
}

function Login({ id }: LoginProps) {
  const [values, setValues] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{email?:string; password?: string}>({});
  const router = useRouter();

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
    <div className={styles.SignInContainer}>
      <div id={id} className={styles.SignIn_Form}>
        <div className={styles.Logo}>
          <Image src={logo_black} alt="로고 이미지" />
        </div>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Email}>
          <Label className={styles.Label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.Input}
            name="email"
            type="text"
            placeholder="이메일 입력"
            onChange={handleChange}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            value={values.email}
          />
          {errors.email && <div className={styles.Error}>{errors.email}</div>}
          </div>
          <div className={styles.Password}>
          <Label className={styles.Label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.Input}
            name="password"
            type="password"
            placeholder="비밀번호 입력"
            value={values.password}
            onChange={handleChange}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          {errors.password && <div className={styles.Error}>{errors.password}</div>}
          </div>
          <PrimaryButton className={styles.Button}>로그인</PrimaryButton>
          <div className={styles.Move_login}>
            계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
