import React from 'react';
import {ButtonStyled} from "./Button.styled";

export const Button = ({text, onClick, width}) => {
    return (
        <ButtonStyled width={width} onClick={onClick}>{text}</ButtonStyled>
    );
}

export default Button;
