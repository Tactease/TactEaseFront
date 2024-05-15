import React from 'react';
import { useEffect, useState } from "react";
import { getRequestsOfSoldier } from "../../API/requests.api.js";
import { formatMissionType } from "../Request/Request.jsx";
import { StatusCell } from "../RequestDataGrid/RequestDataGrid.styled.js";
import ApproveRequestForm from "../RequestDataGrid/ApproveRequestForm.jsx";
import MobileReqContainer from "../../components/MobileContainer/MobileContainer.jsx";
import { AllRequestContainer } from "../MobileContainer/MobileContainer.styled.js";

const SoldierRequestMobile = ({ user, soldier, reloadData }) => {
    const [requests, setRequests] = useState([]);


    useEffect(() => {
        getRequestsOfSoldier(soldier._id.toString()).then((data) => {
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
        <AllRequestContainer>
            {requests.map((request) => (
                <MobileReqContainer key={request.id} user={user} soldier={soldier} request={request} reloadData={reloadData} />
            ))}
        </AllRequestContainer>
    );
};

export default SoldierRequestMobile;
