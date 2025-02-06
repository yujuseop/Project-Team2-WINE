import {useState} from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import styles from './Signup.module.css';
import Image from "next/image";
import logo_black from "../../../public/assets/images/logo_black.svg"
import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';
 
interface SignupProps{
  id:string;
  className?:string;
}

interface SignupState {
    name: string;
    email: string;
    password: string;
    passwordRepeat:string;
}

function Signup({ id }: SignupProps){
  const [values, setValues] = useState<SignupState>({
    name:'',
    email:'',
    password : '',
    passwordRepeat:'',
  });

  function handleChange(e : React.ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;

    setValues((prevValues)=> ({
      ...prevValues,
      [name] : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(values.password !== values.passwordRepeat){
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    /**
     * @TODO
     * 서버에 회원을 생성한다
     * 회원 생성이 성공하면 로그인을 시도한다.
     * 로그인이 성공하면 '/랜딩페이지'로 이동한다.
     */
  }
  return (
    <div id={id} className={styles.Signup_Form}>
      <div className={styles.Logo}>
        <Image src={logo_black} alt="로고 이미지"/>
      </div>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">이메일</Label>
        <Input id="email" className={styles.Input} name='email' onChange={handleChange} value={values.email}/>
        <Label className={styles.Label} htmlFor="name">닉네임</Label>
        <Input id="name" className={styles.Input} name='name' onChange={handleChange} value={values.name}/>
        <Label className={styles.Label} htmlFor="password">비밀번호</Label>
        <Input id="password" className={styles.Input} name='password' onChange={handleChange} value={values.password}/>
        <Label className={styles.Label} htmlFor="passwordRepeat">비밀번호 확인</Label>
        <Input id="passwordRepeat" className={styles.Input} name='passwordRepeat' onChange={handleChange} value={values.passwordRepeat}/>
        <PrimaryButton className={styles.Button}>회원가입</PrimaryButton>
        <div className={styles.Move_login}>계정이 이미 있으신가요? <Link href="/login">로그인하기</Link></div>
      </form>
      </div>
  )



}

export default Signup;