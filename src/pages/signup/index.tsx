import { useState } from "react";
import { useRouter } from "next/router";
import Label from "../../components/Label";
import Input from "../../components/Input";
import styles from "./SignUp.module.css";
import Image from "next/image";
import logo_black from "../../../public/assets/images/logo_black.svg";
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const { name, email, password, passwordRepeat } = values;
      //회원가입요청
      await axios.post("/auth/signUp", {
        nickname: name,
        email,
        password,
        passwordConfirmation: passwordRepeat,
      });
      console.log("회원가입 성공!");
      //로그인 요청
      const loginResponse = await axios.post("/auth/signIn", {
        email,
        password,
      });

      const token = loginResponse.data.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        console.log("토큰 저장 완료:", localStorage.getItem("accessToken"));

        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "회원가입 또는 로그인 실패:",
        err.response?.data || err.message
      );
      console.log("에러 전체 응답:", err.response);
      alert("회원가입 또는 로그인에 실패했습니다.");
    }
  }

  return (
    <div id={id} className={styles.Signup_Form}>
      <div className={styles.Logo}>
        <Image src={logo_black} alt="로고 이미지" />
      </div>
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
          type="name"
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
