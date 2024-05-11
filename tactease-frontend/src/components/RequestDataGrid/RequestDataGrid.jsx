import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {getRequestsOfSoldier} from "../../API/requests.api.js";
import { formatMissionType } from "../Request/Request.jsx";
import { StatusCell } from "./RequestDataGrid.styled.js";

// eslint-disable-next-line react/prop-types
const RequestDataGrid = ({ user, columns }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getRequestsOfSoldier(user._id.toString()).then((data) => {
            let req = [];
            for (let i = 0; i < data.data.length; i++) {
                let newReq = {
                    id: i + 1,
                    requestType: formatMissionType(data.data[i].requestType),
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
        <Box sx={{ width: '100%' }}>
        <DataGrid
            columns={columns.map(column => {
                if (column.field === 'status') {
                    return {
                        ...column,
                        renderCell: (params) => (
                            <StatusCell status={params.value}>{params.value}</StatusCell>
                        )
                    };
                }
                return column;
            })}
            rows={requests}
            autoHeight
            autoPageSize
        />
    </Box>
    );
};

export default RequestDataGrid;
