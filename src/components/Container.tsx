import styles from './Container.module.css';
import React, {ReactNode} from 'react';

export default function Container({
    className = '', 
    page=false, 
    children,
} :{
    className ?: string;
    page ?: boolean;
    children: ReactNode;
}){
    const classNames= `${styles.container} ${page ? styles.page : ''} ${className}`;
    return <div className={classNames}>{children}</div>;
}