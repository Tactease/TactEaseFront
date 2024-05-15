import styled from "styled-components";

export const RequestsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 25px;
    
`;

export const RequestsDataGrid = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 521px) {
        display: none;
    }
`;

export const RequestsDataGridMobile = styled.div`
    display: none;

    @media (max-width: 521px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;