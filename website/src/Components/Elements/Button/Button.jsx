import React from 'react';
import './Button.scss'

const Button = ({children, ...OtherProp}) =>{
    return(
        <button className ='btn' {...OtherProp}>
            {children}
        </button>
    )
}

export default Button;