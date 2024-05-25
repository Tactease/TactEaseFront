import styled from "styled-components";

export const MobileContainer = styled.div`
    display: flex;
    flex-flow: row;
    gap: 25px;
    width: 90vw;   
    background-color: #FAFAFA; 
    border-radius: 5px;
`;
export const Line = styled.svg`
    opacity: 0.3;
    fill: #0E3B77;
    stroke: #0E3B77;
    display: flex;
    justify-self: flex-start;
    stroke-width: 5px;
    border-radius: 5px;
    position: relative;
    width: 5px;
`;

export const TextContainer = styled.div`
    font-size: 1rem;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    gap: 7px;
`;

export const ButtonTextConatiner = styled.button`
    font-size: 1rem;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    gap: 7px;
    border: none;
    background-color: transparent;
`

export const BoldedText = styled.span`
    font-weight: 500;
`;

export const AllRequestContainer = styled.div`
    display: flex;
    flex-flow: column;
    gap: 20px;
`;

export const PendingRequests = styled.span`
    color: ${props => {
        switch (props.status) {
            case "true":
                return '#9489D6';
            default:
                return 'inherit';
        }
    }};
    font-weight: 500;
`;

export const StatusSpan = styled.span`
    color: ${props => {
        switch (props.status) {
            case 'Pending':
                return '#9489D6';
            case 'Approved':
                return '#6BD0A0';
            case 'Rejected':
                return '#FD6868';
            default:
                return 'inherit';
        }
    }};
    font-weight: 500;
`;
