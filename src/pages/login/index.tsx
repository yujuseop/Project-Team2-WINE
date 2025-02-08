import logo_black from "../../../public/assets/images/logo_black.svg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import instance from "@/libs/axios";
import styles from "./SignIn.module.css";
import Label from "@/components/Label";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

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
    const { email, password } = values;
    await instance.post("/auth/signIn", { email, password });
    router.push("/");
  }

  return (
    <div>
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
            placeholder="이메일 입력"
            onChange={handleChange}
            value={values.email}
          />
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
          />
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
