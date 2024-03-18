import React from 'react';
import { HeaderStyle, LogoStyle } from "./Header.style.js";
import Logo from "../../assets/TactEaseLogo.png";


const Header = ({}) => {
    return (
        <HeaderStyle>
            <LogoStyle src={Logo} alt="logo"/>
        </HeaderStyle>
    );
};


export default Header;
