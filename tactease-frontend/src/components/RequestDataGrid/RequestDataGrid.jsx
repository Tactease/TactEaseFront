import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { getRequestsOfSoldier } from "../../API/requests.api.js";
import { formatMissionType } from "../Request/Request.jsx";
import { StatusCell } from "./RequestDataGrid.styled.js";
import ApproveRequestForm from "./ApproveRequestForm.jsx";
import {
    DataGrid,
    useGridApiRef,
    gridClasses,
} from '@mui/x-data-grid';

// eslint-disable-next-line react/prop-types
const RequestDataGrid = ({ user, reloadData }) => {
    const [requests, setRequests] = useState([]);
    const [reloadGrid, setReloadGrid] = useState(true);
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
                    requestType: formatMissionType(data.data[i].requestType),
                    hours: data.data[i].startDate.split(' ')[1] + ' - ' + data.data[i].endDate.split(' ')[1],
                    dates: data.data[i].startDate.split(' ')[0] + ' - ' + data.data[i].endDate.split(' ')[0],
                    note: data.data[i].note,
                    status: data.data[i].status
                }
                req.push(newReq);
            }
            setRequests(req);
            setReloadGrid(false);
        });

    }, [reloadGrid]);


    const reloadDataGrid = () => {
        setReloadGrid(true);
    };

    const renderCell = (params) => {
        if (user.pakal === 'COMMANDER' && params.field === 'status' && params.value === 'Pending') {
            return <ApproveRequestForm soldier={user} reqId={params.row.id - 1} reloadData={reloadData} reloadDataGrid={reloadDataGrid} />;
        } else {
            return <StatusCell status={params.value}>{params.value}</StatusCell>;
        }
    };

    const autosizeOptions = {
        includeOutliers: true,
    };
    const apiRef = useGridApiRef();

    const modifiedColumns = columns.map(column => {
        if (column.field === 'status') {
            return {
                ...column,
                renderCell: renderCell
            };
        }
        return column;
    });

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                apiRef={apiRef}
                columns={modifiedColumns}
                rows={requests}
                autoHeight
                autosizeOptions={autosizeOptions}
                getRowHeight={() => 'auto'}
                sx={{
                    [`& .${gridClasses.cell}`]: {
                        py: 2,
                    },
                }}
            />
        </Box>
    );
};

export default RequestDataGrid;
