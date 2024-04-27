import { useState, useEffect } from "react";
import { getRequestsOfSoldier } from "../../API/requests.api.js";
import { RequestsContainer, RequestsDataGrid } from './Requests.styled.js';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';

const Requests = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [requests, setRequests] = useState([]);
    const columns = [
        { field: 'requestType', headerName: 'Request Type', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'hours', headerName: 'Hours', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'dates', headerName: 'Dates', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'note', headerName: 'Note', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center' }
    ];

    useEffect(() => {
        getRequestsOfSoldier(user._id.toString()).then((data) => {
            let req = [];
            for (let i = 0; i < data.data.length; i++) {
                let newReq = {
                    id: i + 1,
                    requestType: data.data[i].requestType,
                    hours: data.data[i].startDate.split(' ')[1] + ' - ' + data.data[i].endDate.split(' ')[1],
                    dates: data.data[i].startDate.split(' ')[0] + ' - ' + data.data[i].endDate.split(' ')[0],
                    note: data.data[i].note,
                    status: data.data[i].status
                }
                req.push(newReq);
            }
            setRequests(req);
        });
    }, []);

    return (
        <RequestsContainer>
            <PageTitle title="My Requests" />
            <RequestsDataGrid>
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={requests}
                        autoHeight
                        autoPageSize
                    />
                </Box>
            </RequestsDataGrid>
        </RequestsContainer>
    )
};

export default Requests;