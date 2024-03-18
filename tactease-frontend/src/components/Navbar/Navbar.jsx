import React, {useState} from 'react';
import {  NavigateStyle, UlStyle, LiStyle } from './Navbar.style';


const Navbar = ({}) => {
    return (
        <NavigateStyle>
            <UlStyle>
                <LiStyle>Home</LiStyle>
                <LiStyle>Requests</LiStyle>
            </UlStyle>
        </NavigateStyle>
    );
};

export default Navbar;
