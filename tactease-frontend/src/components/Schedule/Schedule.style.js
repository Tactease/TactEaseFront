import styled from 'styled-components';

export const TableContainer = styled.table`
    border: 1px solid #eee;
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
`;

export const TableHeader = styled.th`
    text-align: left;
    padding: 8px;
    font-weight: 1000px;
`;

export const TableRow = styled.tr`
    border: 1px solid #fff;
    text-align: left;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const TableCell = styled.td`
    border: 1px solid #fff;
    text-align: left;
    padding: 8px;
`;

export const TableHead = styled.thead`
    background-color: #eee;
`;

export const TableBody = styled.tbody`
    background-color: #fff;
`;
