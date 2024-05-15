import styled from "styled-components";

export const MainContainer = styled.main`
    width: 100%;
    display: flex;
    flex-flow: column;
    @media (max-width: 768px) {
        margin-top: 80px;
        margin-bottom: 20px;
    }
`;