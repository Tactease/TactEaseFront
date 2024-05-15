import styled from "styled-components";

export const UserInfoContainer = styled.div`
    display: flex;
    flex-flow: row;
    width: 30vw;
    gap: 3%;
    justify-content: flex-end;
    align-items: center;
    margin: 0.5% 1% 0 0;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

export const UserImg = styled.img`
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 50px;

`;

export const UserInfomation = styled.div`
    font-size: 0.9em;
    color: #0E3B77;
    
    &:first-child {
        font-weight: 1000;
        font-size: 1.2em;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-flow: column;
`;
