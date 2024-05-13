import React, {useState} from 'react';
import {  NavigateStyle, UlStyle, LiStyle, LinkStyle } from './Navbar.style';


const Navbar = ({}) => {
    return (
        <NavigateStyle>
            <UlStyle>
                <LiStyle><LinkStyle to="/" exact activeClassName="active">Home</LinkStyle></LiStyle>
                <LiStyle><LinkStyle to="/requests" activeClassName="active">Requests</LinkStyle></LiStyle>
            </UlStyle>
        </NavigateStyle>
    );
};

export default Navbar;
