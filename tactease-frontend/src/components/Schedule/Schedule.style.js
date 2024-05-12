import styled from 'styled-components';

export const TableContainer = styled.table`
    border: 1px solid #eee;
    border-radius: 5px;
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-flow: column;
`;

export const TableHeader = styled.th`
    text-align: left;
    width: 33%;
    padding: 8px;
    font-weight: 1000px;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    text-align: center;
`;

export const TableRow = styled.tr`
    border: 1px solid #fff;
    border-bottom: 1px solid #eee;
    text-align: left;
    padding: 4px;
    display: flex;
    flex-flow: row;
    justify-content: space-around;

`;

export const TableCell = styled.td`
    text-align: center;
    width: 33%;
    text-align: center;

`;

export const TableHead = styled.thead`
    background-color: #fff;
`;

export const TableBody = styled.tbody`
    background-color: #fff;
`;

export const MissionInfo = styled.p`
    margin: 1px;
    padding: 1px;
    font-size: 17px;
    `;

export const MissionInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    `;

export const ScheduleNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;
