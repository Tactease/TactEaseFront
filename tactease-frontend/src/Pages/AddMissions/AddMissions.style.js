import styled from "styled-components";

export const MissionsLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const UtilButton = styled.button`
    border: none;
    background-color: #fff;
    cursor: pointer;
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: auto;
    width: 90vw;
`

export const GridMissionType = styled.div`
    grid-row: 1;
    grid-column: 1;
    align-items: center;
    justify-self: center;
    justify-content: center;
    font-weight: ${props => props.isHeader ? 'bold' : 'normal'};
    padding: 10px;
    font-size: 1.2vw;
    
    @media (max-width: 900px) {
        font-size: 2vw;
    }

    @media (max-width: 555px) {
        font-size: 3vw;
    }
    `
export const GridStartDate = styled.div`
    grid-row: span 1;
    grid-column: 2;
    justify-self: center;
    align-items: center;
    justify-content: center;
    font-weight: ${props => props.isHeader ? 'bold' : 'normal'};
    padding: 10px;
    font-size: 1.2vw;
    
    @media (max-width: 900px) {
        font-size: 2vw;
    }

    @media (max-width: 555px) {
        font-size: 3vw;
    }
    `
export const GridEndDate = styled.div`
    grid-row: span 1;
    grid-column:3;
    justify-self: center;
    align-items: center;
    justify-content: center;
    font-weight: ${props => props.isHeader ? 'bold' : 'normal'};
    padding: 10px;
    font-size: 1.2vw;
    
    @media (max-width: 900px) {
        font-size: 2vw;
    }

    @media (max-width: 555px) {
        font-size: 3vw;
    }
    `
export const GridParticipants = styled.div`
    align-items: center;
    grid-row: span 1;
    grid-column:4;
    justify-content: center;
    justify-self: center;
    font-weight: ${props => props.isHeader ? 'bold' : 'normal'};
    padding: 10px;
    font-size: 1.2vw;

    @media (max-width: 900px) {
        font-size: 2vw;
    }

    @media (max-width: 555px) {
        font-size: 3vw;
    }
    `
export const GridDelete = styled.div`
    grid-row: span 1;
    grid-column: 5;
    justify-self: center;
    align-items: center;
    padding: 10px;
    width: 1.2vw;

    @media (max-width: 900px) {
        font-size: 2vw;
    }
    
    @media (max-width: 555px) {
        font-size: 3vw;
    }
    `

export const GridForm = styled.div`
    grid-column:1 / 6 ;
    `

export const GridAdd = styled.div`
    grid-column:3;
    grid-row: 7;
    justify-self: center;
    `

export const GridMission = styled.div`
    display: grid;
    grid-column-start: 1;
    grid-template-columns: repeat(5, 1fr);
    grid-column: span 5;

`

export const ButtonPosition = styled.div`
position: absolute;
bottom: 10%;
`
