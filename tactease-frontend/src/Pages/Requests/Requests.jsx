import { useState, useEffect } from "react";
import { RequestsContainer, RequestsDataGrid } from './Requests.styled.js';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import RequestDataGrid from "../../components/RequestDataGrid/RequestDataGrid.jsx";


const Requests = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const columns = [
        { field: 'requestType', headerName: 'Request Type', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'hours', headerName: 'Hours', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'dates', headerName: 'Dates', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'note', headerName: 'Note', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center' }
    ];
    const [pageTitle] = useState(user.pakal !== "COMMANDER" ? "My Requests" : "Soldiers Requests");

    return (
        <RequestsContainer>
            <PageTitle title={pageTitle} />
            <RequestsDataGrid>
                {user.pakal !== "COMMANDER" ? <RequestDataGrid user={user} columns={columns} /> : null}
            </RequestsDataGrid>
        </RequestsContainer>
    )
};

export default Requests;
