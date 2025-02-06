import { useState } from "react";
import { useRouter } from "next/router";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "./Signup.module.css";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import axios from "@/libs/axios";
import { AxiosError } from "axios";

interface SignupProps {
  id: string;
  className?: string;
}

interface SignupState {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

function Signup({ id }: SignupProps) {
  const [values, setValues] = useState<SignupState>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // 🔍 입력값 변경 디버깅
    console.log(`입력 변경됨 - ${name}:`, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, passwordRepeat } = values;

    console.log("폼 제출됨:", values);

    if (password !== passwordRepeat) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("회원가입 요청 중...");

      const signupResponse = await axios.post(
        "/auth/signUp",
        {
          nickname: name,
          email,
          password,
          passwordConfirmation: passwordRepeat,
        },
        { withCredentials: true }
      );

      console.log("회원가입 성공! 응답 데이터:", signupResponse.data);

      console.log("로그인 요청 중...");
      const loginResponse = await axios.post(
        "/auth/signIn",
        { email, password },
        { withCredentials: true }
      );

      const token = loginResponse.data.token;
      if (token) {
        localStorage.setItem("userToken", token);
        console.log("로그인 성공! 토큰 저장 완료:", token);
      }

      router.push("/landing");
    } catch (error) {
      const err = error as AxiosError;
      console.error("회원가입 또는 로그인 실패");
      console.error("에러 메시지:", err.message);
      console.error("응답 데이터:", err.response?.data);
      alert("회원가입 또는 로그인에 실패했습니다.");
    }
  };

  return (
    <div id={id} className={styles.Signup_Form}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="example@email.com"
          onChange={handleChange}
          value={values.email}
        />

        <Label className={styles.Label} htmlFor="name">
          닉네임
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="와인병"
          onChange={handleChange}
          value={values.name}
        />

        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="8자 이상"
          value={values.password}
          onChange={handleChange}
        />

        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          value={values.passwordRepeat}
        />

        <PrimaryButton className={styles.Button}>회원가입</PrimaryButton>

        <div className={styles.Move_login}>
          계정이 이미 있으신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
