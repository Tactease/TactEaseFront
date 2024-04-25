// eslint-disable-next-line no-unused-vars
import React from 'react';
import { HeaderStyle, LogoStyle } from "./Header.style.js";
import Logo from "../../assets/TactEaseLogo.png";
import UserInfo from "../UserInfo/userInfo.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Link } from 'react-router-dom';


const Header = ({}) => {
    return (
        <HeaderStyle>
            <Link to="/">
            <LogoStyle src={Logo} alt="logo"/>
            </Link>
            <Navbar />
            <UserInfo/>
        </HeaderStyle>
    );
};


export default Header;
