import styled from "styled-components";

export const UserInfoContainer = styled.div`
    display: flex;
    flex-flow: row;
    width: 30vw;
    gap: 3%;
    justify-content: flex-end;
    margin-top: 0.5%;
`;

export const UserImg = styled.img`
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 50%;
    background-color: #0E3B77;
`;

export const UserInfomation = styled.div`
    font-size: 15px;
    color: #0E3B77;
    
    &:first-child {
        font-weight: 1000;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 2%;
`;
