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
    //grid-template-columns: repeat(5, 20%);
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-auto-rows: 25%;
    grid-template-areas: "missionType" "startDate" "endDate" "participants" "delete" 
    //"missionType startDate endDate participants delete" "missionType startDate endDate participants delete" "missionType startDate endDate participants delete" "missionType startDate endDate participants delete" "missionType startDate endDate participants delete"
    ". . add . ." ;
    width: 80vw;
`

export const GridMissionType = styled.div`
    grid-area: missionType;
    //grid-column-start: 1;
    //grid-column-end: 1;
    //grid-row-start: 1;
    //grid-row-end: 1;
    align-items: center;
    justify-self: center;
    justify-content: center;
    display: grid;
    `
export const GridStartDate = styled.div`
    grid-area: startDate;
    //grid-column-start: 2;
    //grid-column-end: 2;
    //grid-row-start: 1;
    //grid-row-end: 1;
    justify-self: center;
    align-items: center;
    justify-content: center;
    display: grid;
    `
export const GridEndDate = styled.div`
    grid-area: endDate;
    //grid-column-start: 3;
    //grid-column-end: 3;
    //grid-row-start: 1;
    //grid-row-end: 1;
    justify-self: center;
    align-items: center;
    justify-content: center;
    display: grid;
    `
export const GridParticipants = styled.div`
    grid-area: participants;
    //grid-column-start: 4;
    //grid-column-end: 4;
    //grid-row-start: 1;
    //grid-row-end: 1;
    align-items: center;
    justify-content: center;
    display: grid;
    `
export const GridDelete = styled.div`
    grid-area: delete;
    //grid-column-start: 5;
    //grid-column-end: 5;
    //grid-row-start: 1;
    //grid-row-end: 1;
    justify-self: center;
    align-items: center;
    display: grid;
    `

export const GridForm = styled.div`
    grid-area: form;
    //grid-column-start: 1;
    //grid-column-end: 5;
    display: grid;
    `

export const GridAdd = styled.div`
    grid-area: add;
    //grid-column-start: 3;
    //grid-column-end: 4;
    //grid-row-start: 6;
    //grid-row-end: 6;
    justify-content: center;
    display: grid;
    `


export const GridHeader = styled.div`
    //grid-area: header;
    font-weight: bold;
    display: grid;
    border-bottom: 1px solid black;
    //grid-column-start: 1;
    //grid-column-end: 6;
`

export const GridMission = styled.div`
    display: grid;
    grid-column-start: 1;
    grid-template-columns: repeat(5, 1fr);
    grid-column: span 5;

`

export const ButtonPosition = styled.div`
position: absolute;
bottom: 5%;
`
