import React from "react";
import {UserImg, UserInfoContainer, UserInfomation, InfoContainer} from "./userInfo.style.js";

const UserInfo = ({}) => {
    return (
        <UserInfoContainer>
            <UserImg src="" alt=""/>
            <InfoContainer>
            <UserInfomation>Satoru Gojo</UserInfomation>
            <UserInfomation>Class Commander</UserInfomation>
            </InfoContainer>
        </UserInfoContainer>
    );
};
export default UserInfo;
