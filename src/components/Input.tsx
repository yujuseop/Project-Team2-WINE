import styles from './Input.module.css';
import React, {forwardRef, InputHTMLAttributes} from 'react';



interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}//인터페이스 정의, input 태그의 모든 속성을포함, 추가적으로 className을 받을 수 있도록 확장
//이렇게 하면 다른 페이지에서 사용할 때 다양한 속성 추가 가능.


const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className = '', ...rest}, ref) =>{
        return<input ref={ref} className={`${styles.Input} ${className}`} {...rest}/>
    }
);
//forwardRef사용이유: 부모 컴포넌트에서 ref를 직접 Input 컴포넌트 내부의 input에 연결할 수 있다.

Input.displayName = 'Input' //forwardRef대신  input으로 표시되게 하기 위함. forwardRef를 사용하면 기본적으로 Devtools에서 이름이 Anonymous로 나옴.

export default Input