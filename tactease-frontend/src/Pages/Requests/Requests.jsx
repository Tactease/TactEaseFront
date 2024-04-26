import { useState, useEffect } from "react";
import { getRequestsOfSoldier } from "../../API/requests.api.js";
import { RequestsContainer } from './Requests.styled.js';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';

const Requests = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [requests, setRequests] = useState([]);
    const columns = [{field: 'Request Type'}, {field: 'Hours'}, {field: 'Dates'}, {field: 'Note'}, {field: 'Status'}];

    useEffect(() => {
        getRequestsOfSoldier(user._id.toString()).then((data) => {
            let req = [];
            for (let i = 0; i < data.data.length; i++) {
                let newReq = {
                    requestType: data.data[i].requestType,
                    hours: data.data.startDate.split(' ')[1] + ' - ' + data.data.endDate.split(' ')[1],
                    dates: data.data.startDate.split(' ')[0] + ' - ' + data.data.endDate.split(' ')[0],
                    note: data.data[i].note,
                    status: data.data[i].status
                }
                req.append(newReq);
            }
            setRequests(data.data);
        });
    }, []);


    return (
        <RequestsContainer>
            <PageTitle title="My Requests"/>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={requests}
                    getRowHeight={() => 'auto'}
                />
            </Box>
        </RequestsContainer>
    )
};

export default Requests;
