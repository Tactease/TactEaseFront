import styled from "styled-components";

export const HeaderStyle = styled.header`
    display: flex;
    justify-content: flex-start;
    flex-flow: row;
    margin: 1% 1% 0.5% 1%;  

    @media (max-width: 768px) {
        justify-content: center;
        position: fixed;
        height: 70px;
        width: 100%;
        background-color: #FFFFFF;
    }
`;


export const LogoStyle = styled.img`
    width: 140px;
    height: 90px;
    display: block;

    @media (max-width: 768px) {
        width: 100px;
        height: 60px;
    }
`;
