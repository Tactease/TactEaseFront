import styled from "styled-components";

export const FooterContainer = styled.footer`
    width: 100%;
    display: none;
    
    @media (max-width: 768px) {
        position: fixed;
        display: flex;
        width: 98vw;
        height: 10vh;
        flex-flow: row;
        justify-content: space-around;
        bottom: 0;
        background-color: #FFFFFF;
    }
`;


