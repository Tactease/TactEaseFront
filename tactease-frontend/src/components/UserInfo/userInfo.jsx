import React from "react";
import {UserImg, UserInfoContainer, UserInfomation, InfoContainer} from "./userInfo.style.js";
import userDefault from "../../assets/userDefault.png";

const UserInfo = ({}) => {
    return (
        <UserInfoContainer>
            <UserImg src={userDefault} alt="userDefault"/>
            <InfoContainer>
            <UserInfomation>Satoru Gojo</UserInfomation>
            <UserInfomation>Class Commander</UserInfomation>
            </InfoContainer>
        </UserInfoContainer>
    );
};
export default UserInfo;
