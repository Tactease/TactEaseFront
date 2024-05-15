import { MobileContainer, Line, TextContainer, BoldedText, StatusSpan, PendingRequests, ButtonTextConatiner } from './MobileContainer.styled.js';
import ApproveRequestForm from "../RequestDataGrid/ApproveRequestForm.jsx";

const MobileReqContainer = ({ user, soldier, request, reqId, reloadData, onClick, display }) => {

    return (
        <MobileContainer>
            <div>
                <Line>
                    <line x1="0" y1="0" x2="0" y2="100%"></line>
                </Line>
            </div>
            {request &&
                <TextContainer>
                    <p><BoldedText>Request Type:</BoldedText> {request.requestType}</p>
                    <p><BoldedText>Hours:</BoldedText> {request.hours}</p>
                    <p><BoldedText>Dates:</BoldedText> {request.dates}</p>
                    <p><BoldedText>Note:</BoldedText> {request.note} </p>
                    <p><BoldedText>Status:</BoldedText>
                        {user.pakal === "COMMANDER" && <ApproveRequestForm soldier={soldier} reqId={reqId} reloadData={reloadData} reloadDataGrid={reloadData} />}
                        {user.pakal !== "COMMANDER" && <StatusSpan status={request.status}>{request.status} </StatusSpan>}
                    </p>
                </TextContainer>}
            {user.pakal === "COMMANDER" && display &&
                <ButtonTextConatiner onClick={onClick}>
                    <p><BoldedText>Personal Number:</BoldedText> {soldier.personalNumber}</p>
                    <p><BoldedText>Name:</BoldedText> {soldier.fullName}</p>
                    <p><BoldedText>Pakal:</BoldedText> {soldier.pakal}</p>
                    <p><BoldedText>Pending Requests:</BoldedText> <PendingRequests status={soldier.requestStatus.toString()}> {soldier.requestStatus === true ? "Pending requests" : "No requests to approve"} </PendingRequests> </p>
                </ButtonTextConatiner>}
        </MobileContainer>
    );

};

export default MobileReqContainer;