import React from 'react';
import {ButtonStyled} from "./Button.styled";

export const Button = ({text, onClick, width, disabled}) => {
    return (
        <ButtonStyled width={width} onClick={onClick} disabled={disabled}>{text}</ButtonStyled>
    );
}

export default Button;
