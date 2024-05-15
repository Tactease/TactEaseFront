import styled from "styled-components";

export const PageTitleContainer = styled.div`
    margin: 1% 0;
    display: flex;
    justify-content: center;
    width: 100%;
    
        @media (max-width: 768px) {
            margin-top: 80px;
        }
`;

export const PageTitleStyled = styled.h1`
    font-size: 1.8rem;
    font-weight: 500;
    color: #0E3B77;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;
