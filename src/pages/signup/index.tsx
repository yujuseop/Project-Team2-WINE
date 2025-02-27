import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Label from "../../components/Label";
import Input from "../../components/Input";
import styles from "./SignUp.module.css";
import Image from "next/image";
import logo_black from "../../../public/assets/images/logo_black.svg";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import axios from "@/libs/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import React from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    passwordRepeat?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    //로그인이 되어있을 시 다시 랜딩페이지로 이동.
    const token = Cookies.get("accessToken");
    if (token) {
      router.push("/");
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
    let errorMessage = "";

    if (!value) {
      if (name === "email") errorMessage = "이메일 입력은 필수입니다.";
      else if (name === "password")
        errorMessage = "비밀번호 입력은 필수입니다.";
      else if (name === "name") errorMessage = "닉네임 입력은 필수입니다.";
      else if (name === "passwordRepeat")
        errorMessage = "비밀번호 확인 값을 입력해주세요.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
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
    const { email, password, name, passwordRepeat } = values;
    const newErrors: {
      email?: string;
      password?: string;
      name?: string;
      passwordRepeat?: string;
    } = {};
    const passwordRange =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    //오류메세지 작성.
    if (!email) {
      newErrors.email = "이메일 입력은 필수입니다.";
    } else if (!email.includes("@")) {
      newErrors.email = "이메일 형식으로 작성해주세요.";
    }
    if (!password) {
      newErrors.password = "비밀번호 입력은 필수입니다.";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상입니다.";
    } else if (!passwordRange.test(password)) {
      newErrors.password =
        "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다.";
    }
    if (!name) {
      newErrors.name = "닉네임 입력은 필수입니다.";
    } else if (name.length > 20) {
      newErrors.name = "닉네임은 최소 20자까지 가능합니다.";
    }
    if (!passwordRepeat)
      newErrors.passwordRepeat = "비밀번호 확인 값을 입력해주세요.";
    if (password.length < 8)
      newErrors.password = "비밀번호는 최소 8자 이상 입력해야 합니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((msg)=> toast.error(msg));
      return;
    }

    if (values.password !== values.passwordRepeat) {
      toast.error("비밀번호가 일치하지 않습니다.");
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
      //로그인 요청
      const loginResponse = await axios.post("/auth/signIn", {
        email,
        password,
      });

      const { accessToken, refreshToken } = loginResponse.data;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 0.1, path: "/" });
        Cookies.set("refreshToken", refreshToken, { expires: 1, path: "/" });

         toast.success("회원가입 성공!"); 
        router.push("/");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("회원가입 실패:", err.response?.data || err.message);
  
      if (err.response?.data?.message) {
        const errorMessage = err.response.data.message;
  
        if (errorMessage.includes("email")) {
          toast.error("이미 사용 중인 이메일입니다.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("회원가입 또는 로그인에 실패했습니다.");
      }
    }
  }

  return (
    <>
      <Head>
        <title>WHYNE - 회원가입</title>
      </Head>
      <div className={styles.container}>
        <div id={id} className={styles.signup_form}>
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
               placeholder="example@email.com"
               onChange={handleChange}
               value={values.email}
               onFocus={handleFocusIn}
               onBlur={handleFocusOut}
             />
             {errors.email && (
               <div className={styles.error}>{errors.email}</div>
              )}
            </div>
        <div className={styles.name}>
        <Label className={styles.label} htmlFor="name">
          닉네임
        </Label>
        <Input
          id="name"
          className={styles.input}
          name="name"
          type="name"
          placeholder="와인병"
          onChange={handleChange}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          value={values.name}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
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
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          value={values.password}
          onChange={handleChange}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        />
        {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>
        <div className={styles.password_repeat}>
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          value={values.passwordRepeat}
        />
        {errors.passwordRepeat && <div className={styles.error}>{errors.passwordRepeat}</div>}
        </div>
        <PrimaryButton className={styles.button}>회원가입</PrimaryButton>
        <ToastContainer/>
        <div className={styles.move_login}>
          계정이 이미 있으신가요? <Link href="/signin">로그인하기</Link>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default Signup;
