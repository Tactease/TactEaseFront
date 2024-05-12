import { useState, useEffect } from "react";
import { RequestsContainer, RequestsDataGrid } from './Requests.styled.js';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import RequestDataGrid from "../../components/RequestDataGrid/RequestDataGrid.jsx";
import SoldierRequests from "../../components/RequestDataGrid/SoldierRequests.jsx";

const Requests = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const [pageTitle] = useState(user.pakal !== "COMMANDER" ? "My Requests" : "Soldiers Requests");

    return (
        <RequestsContainer>
            <PageTitle title={pageTitle} />
            <RequestsDataGrid>
                {user.pakal !== "COMMANDER" ? <RequestDataGrid user={user} /> : null}
                {user.pakal === "COMMANDER" ? <SoldierRequests user={user} /> : null}
            </RequestsDataGrid>
        </RequestsContainer>
    )
};

export default Requests;
