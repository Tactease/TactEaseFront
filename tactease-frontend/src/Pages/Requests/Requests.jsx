import { useState, useEffect } from "react";
import { RequestsContainer, RequestsDataGrid } from './Requests.styled.js';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import RequestDataGrid from "../../components/RequestDataGrid/RequestDataGrid.jsx";
import SoldierRequests from "../../components/RequestDataGrid/SoldierRequests.jsx";
import Button from "../../components/Button/Button.jsx";
import {Link} from "react-router-dom";

const Requests = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const [pageTitle] = useState(user.pakal !== "COMMANDER" ? `${user.fullName}'s Requests` : "Soldiers Requests");

    return (
        <RequestsContainer>
            <PageTitle title={pageTitle} />
            <RequestsDataGrid>
                {user.pakal !== "COMMANDER" ? <RequestDataGrid user={user} soldier={user} /> : null}
                {user.pakal === "COMMANDER" ? <SoldierRequests user={user} /> : null}
            </RequestsDataGrid>
            {user.pakal !== "COMMANDER" ? (
            <Link to="/newRequest">
            <Button width={150} text={"New Request"}></Button>
            </Link> ) : null}
        </RequestsContainer>
    )
};

export default Requests;
