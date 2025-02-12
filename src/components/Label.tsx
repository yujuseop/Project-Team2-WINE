import styles from './Label.module.css';
import React, {LabelHTMLAttributes, ReactNode} from 'react';


interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
    className?: string;
    children: ReactNode;
}


function Label({className = '', children, ...rest }: LabelProps){
    return(
        <label className={`${styles.Label} ${className}`} {...rest}>
            {children}
        </label>
    )
}

export default Label