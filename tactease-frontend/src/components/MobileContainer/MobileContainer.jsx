import React from 'react';
import { MobileContainer, Line, TextContainer,BoldedText,StatusSpan} from './MobileContainer.styled.js';
import { useEffect, useState } from "react";

const MobileReqContainer = ({ user, soldier, request, reloadData }) => {


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
                <p><BoldedText>Status:</BoldedText> <StatusSpan status={request.status}>{request.status}</StatusSpan></p>

            </TextContainer>}
            {/* {soldier  &&
            <TextContainer>
                <p><BoldedText>Personal Number:</BoldedText> {soldier.personalNumber}</p>
                <p><BoldedText>Name:</BoldedText> {request.fullName}</p>
                <p><BoldedText>Pakal:</BoldedText> {request.pakal}</p>
                <p><BoldedText>Pending Requests:</BoldedText> </p>
            </TextContainer>} */}
        </MobileContainer>
    );

};

export default MobileReqContainer;