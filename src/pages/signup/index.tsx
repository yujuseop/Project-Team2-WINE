import { useState, useEffect } from "react";
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
import Cookies from "js-cookie";

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
  const [errors, setErrors] = useState<{email?:string; password?: string; name?:string; passwordRepeat?:string; }>({});
  const router = useRouter();
  
  useEffect(()=>{ //로그인이 되어있을 시 다시 랜딩페이지로 이동.
    const token = Cookies.get("accessToken");
    if(token) {
      router.push("/");
    }
  }, [router])


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleFocusOut(e: React.FocusEvent<HTMLInputElement>){
    const {name, value} = e.target;
    let errorMessage="";

    if(!value){
      if(name === "email") errorMessage = "이메일 입력은 필수입니다.";
      else if (name === "password") errorMessage="비밀번호 입력은 필수입니다.";
      else if (name === "name") errorMessage="닉네임 입력은 필수입니다.";
      else if (name === "passwordRepeat") errorMessage="비밀번호 확인 값을 입력해주세요.";
    }
    setErrors((prevErrors)=>({
      ...prevErrors,
    [name]: errorMessage, 
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
    const { email, password, name, passwordRepeat } = values;
    const newErrors: {email?:string; password?:string; name?:string; passwordRepeat?:string} ={}; 
    const passwordRange =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  //오류메세지 작성.
    if(!email) {newErrors.email = "이메일 입력은 필수입니다.";
    }else if (!email.includes("@")){
      newErrors.email="이메일 형식으로 작성해주세요.";
    }
    if(!password) {newErrors.password="비밀번호 입력은 필수입니다.";
    }else if (password.length < 8){
      newErrors.password="비밀번호는 최소 8자 이상입니다."
    }else if(!passwordRange.test(password)){
      newErrors.password="비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다."
    }
    if(!name) {newErrors.name="닉네임 입력은 필수입니다.";
    }else if (name.length > 20) {
      newErrors.name="닉네임은 최소 20자까지 가능합니다.";
    }
    if(!passwordRepeat) newErrors.passwordRepeat="비밀번호 확인 값을 입력해주세요."
    if (password.length < 8) newErrors.password = "비밀번호는 최소 8자 이상 입력해야 합니다.";

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return
    }

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

      const {accessToken, refreshToken} = loginResponse.data;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, {expires: 0.1, path:"/"});
        Cookies.set("refreshToken", refreshToken, {expires:1, path:"/"});
        console.log("토큰 저장 완료:", accessToken);

        router.push("/");
       
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
    <div className={styles.container}>
    <div id={id} className={styles.signup_form}>
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
          placeholder="example@email.com"
          onChange={handleChange}
          value={values.email}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
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
          placeholder="8자 이상"
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
        <div className={styles.move_login}>
          계정이 이미 있으신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
