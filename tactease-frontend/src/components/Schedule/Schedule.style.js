import styled from 'styled-components';

export const TableContainer = styled.table`
    border: 1px solid #eee;
    border-radius: 5px;
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
`;

export const TableHeader = styled.th`
    text-align: left;
    width: 100%;
    padding: 8px;
    font-weight: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const TableRow = styled.tr`
    border: 1px solid #fff;
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: left;
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

export const TableCell = styled.td`
    border: 1px solid #fff;
    text-align: left;
    padding: 8px;
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
