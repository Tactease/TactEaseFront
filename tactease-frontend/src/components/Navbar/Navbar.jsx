import React, {useState} from 'react';
import {  NavigateStyle, UlStyle, LiStyle } from './Navbar.style';
import {Link} from "react-router-dom";


const Navbar = ({}) => {
    return (
        <NavigateStyle>
            <UlStyle>
                <LiStyle>Home</LiStyle>
                <Link to={"/newRequest"}>
                <LiStyle>Requests</LiStyle>
                </Link>
            </UlStyle>
        </NavigateStyle>
    );
};

export default Navbar;
