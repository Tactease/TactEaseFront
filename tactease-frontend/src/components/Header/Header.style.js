import styled from "styled-components";

export const HeaderStyle = styled.header`
    display: flex;
    justify-content: flex-start;
    flex-flow: row;
    margin: 1% 1% 0.5% 1%;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;


export const LogoStyle = styled.img`
    width: 140px;
    height: 90px;
    display: block;
`;
